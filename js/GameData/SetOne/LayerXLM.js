addLayer("XLM", {
    name: "Stellar", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ST", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		ethereum: new Decimal(0),
		bitcoin: new Decimal(0),
		bitcoinToGet: new Decimal(0),
		tickspeed: new Decimal(1),
		timeplayed: new Decimal(0),
		interval: new Decimal(1)
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Stellar", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.mul(buyableEffect("XLM", 13))
        mult = mult.mul(buyableEffect("XLM", 14))
        mult = mult.mul(buyableEffect("XLM", 15))
        mult = mult.mul(tmp.XLM.bitcoinToStellar)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    GenerateEthereum() {
      base = new Decimal(0)
      base = base.add(buyableEffect("XLM", 12))
      base = base.mul(buyableEffect("XLM", 14))
      base = base.mul(buyableEffect("XLM", 15))
      return base
    },
    
    passiveGeneration() {
      let gen = new Decimal(1) 
      return gen;
    },
    
    bitcoinToStellar() {
      let base = player.XLM.bitcoin;
      let effect2 = new Decimal.pow(base, 0.2)
      let effect3 = new Decimal.add(effect2, 1)
      return effect3;
    },
    
    bitcoinReset() {
      player.points = new Decimal(0)
      player.XLM.points = new Decimal(0)
      player.XLM.ethereum = new Decimal(0)
      
      player.XLM.buyables[11] = new Decimal(0)
      player.XLM.buyables[12] = new Decimal(0)
      player.XLM.buyables[13] = new Decimal(0)
      
      player.XLM.bitcoin = player.XLM.bitcoin.add(player.XLM.bitcoinToGet)
      player.XLM.bitcoinToGet = new Decimal(0)
    },
    
    bitcoinGain() {
      let base = player.points
      let gain1 = new Decimal.div(base, 1e6)
      let gain2 = new Decimal.pow(gain1, 0.05)
      gain2 = gain2.mul(buyableEffect("XLM", 15))
      return gain2
    },
    
    calculateTickspeed() {
      let Base = new Decimal(1)
      Base = Base.mul(buyableEffect("XLM", 14))
      return Base
    },

    update(diff) {
      player.XLM.ethereum = player.XLM.ethereum.add(tmp.XLM.GenerateEthereum.times(diff))
      player.XLM.bitcoinToGet = tmp.XLM.bitcoinGain
      player.XLM.tickspeed = tmp.XLM.calculateTickspeed
      
      player.XLM.timeplayed = player.XLM.timeplayed.add(player.XLM.interval.times(diff))
    },
    clickables: {
        11: {
            title() { return `<b style="font-size:29px">Hardfork</b><br>
            
            Reset your previous progress for <b style="font-size: 19px">${format(player.XLM.bitcoinToGet)}</b> Bitcoin`},
            canClick() { return player.XLM.bitcoinToGet.gte(1) },
            onClick() {
                  return tmp.XLM.bitcoinReset()
            },
            style() {
              if (tmp[this.layer].clickables[this.id].canClick) return {
                "background": "linear-gradient(-180deg, rgba(175,109,3,1) 0%, rgba(225,176,0,1) 100%)",
                "width": "460px",
                "height": "130px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 5px #000000",
                "color": "#ffe06f"
              }
              return {
                "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
                "width": "460px",
                "height": " 130px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#ffffff"
              }
            },
            unlocked() {
              return player.points.gte(700000)
            }
        },
    },
    buyables: {
        11: {
          cost(x) {
            let PowerI = new Decimal(1.75)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Neural Network Base</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
              "width": "430px",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return true;
          }
        },
        
        12: {
          cost(x) {
            let PowerI = new Decimal(1.25)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">1KHz RAM</b>
                    <h2>+${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Generation</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
              "width": "430px",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(0).add(Decimal.pow(1.25, x.pow(1))).sub(1)
            return Effect;
          },
          unlocked() {
            return player.points.gte(25);
          }
        },
        
        
        13: {
          cost(x) {
            let PowerI = new Decimal(3)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">CPU Improvement</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} more Stellar</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
          },
          canAfford() {
            return player[this.layer].ethereum.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(0,72,218,1) 0%, rgba(6,0,87,1) 100%)",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
              "width": "430px",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].ethereum = player[this.layer].ethereum.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(0).add(Decimal.pow(1.1, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player[this.layer].buyables[12].gte(2);
          }
        },
        
        
        14: {
          cost(x) {
            let PowerI = new Decimal(2.25)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Time Manipulation</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} faster Tickspeed</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
          },
          canAfford() {
            return player[this.layer].bitcoin.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(255,217,4,1) 0%, rgba(165,126,10,1) 100%)",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
              "width": "430px",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].bitcoin = player[this.layer].bitcoin.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(0).add(Decimal.pow(1.75, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player[this.layer].buyables[13].gte(15);
          }
        },
        
        15: {
          cost(x) {
            let PowerI = new Decimal(1.95)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Video Driver</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar-Bitcoin gain</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
          },
          canAfford() {
            return player[this.layer].bitcoin.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(255,217,4,1) 0%, rgba(165,126,10,1) 100%)",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
              "width": "430px",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].bitcoin = player[this.layer].bitcoin.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player[this.layer].buyables[14].gte(8);
          }
        },
    },
    
    tabFormat : {
        "Main" : {
            unlocked() {return true},
            content : [
             ["raw-html", () => {
               let state = []
               if (player.points.gte(1e9)) state.push('Lumens')
                   return `You have <b style="font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.points)}</b> Stellar ${state} `
                                }],
                 ["raw-html", () => {
                   if (player.XLM.ethereum.gte(0.001)) { return `You have <b style="color: #567af0;font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.ethereum)}</b> Ethereum `
                   }
                   else return ``
                 }],
                    ["raw-html", () => {
                   if (player.XLM.bitcoin.gte(0.001)) { return `You have <b style="color: #dbb127;font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.bitcoin)}</b> Bitcoins, that boost Stellar Gain by  <b style="color: #dbb127;font-size: 24px; text-shadow: 0px 0px 10px">${format(tmp.XLM.bitcoinToStellar)}x</b>`
                   }
                   else return ``
                                }],
                                ["raw-html", () => {
                   if (player.XLM.tickspeed.gte(0.001)) { return `For every second that passes in real life, it equals as <b style="color: #ff0061;font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.tickspeed)} <sup>( ${hyperEformat(player.XLM.tickspeed)}x )</sup></b> times / sec in game`
                   }
                   else return ``
                                }],
                                "blank",
                 ["raw-html", () => {
                   return `<b style='font-size:13px; color:#6e6d6d'>You have <b style="color: #9e9d9d;font-size: 16px; text-shadow: 0px 0px 10px">${format(player.points)}</b> points</b><br>
                   <b style='font-size:13px; color:#6e6d6d'>You generate <b style="color: #9e9d9d;font-size: 16px; text-shadow: 0px 0px 10px">${format(tmp.XLM.resetGain)}</b> Stellar / sec</b><br>
                   <b style='font-size:13px; color:#6e6d6d'>Improve XLM gain at <b style="color: #9e9d9d;font-size: 16px; text-shadow: 0px 0px 10px">${format(tmp.XLM.nextAt)}</b> points</b><br>
                   <br>
                     <b style='font-size:13px; color:#6e6d6d'>You generate <b style="color: #565578;font-size: 16px; text-shadow: 0px 0px 10px">${format(tmp.XLM.GenerateEthereum)}</b> Ethereum / sec</b><br>
                    <b style='font-size:13px; color:#6e6d6d'>FOR DEBUG: Reset for <b style="color: #786b55;font-size: 16px; text-shadow: 0px 0px 10px">${format(tmp.XLM.bitcoinGain)}</b> Bitcoin</b><br>
                    <br>
                    <b style='font-size:13px; color:#6e6d6d'>You have spent <b style="color: #32a87b;font-size: 16px; text-shadow: 0px 0px 10px">${formatTimeLong(player.XLM.timeplayed)}</b> in this layer</b><br>
                    <br>
                    `
                                }],
                "blank",
                "blank",
                ["row", [["clickable", 11]]],
                ["row", [["buyable", 11]]],
                ["row", [["buyable", 12]]],
                ["row", [["buyable", 13]]],
                ["row", [["buyable", 14]]],
                ["row", [["buyable", 15]]]
            ]
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "X", description: "X: Reset for Stellar", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
