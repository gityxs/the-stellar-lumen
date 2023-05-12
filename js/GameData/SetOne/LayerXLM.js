addLayer("XLM", {
    name: "Stellar", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		ethereum: new Decimal(0),
		tickspeed: new Decimal(1)
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    GenerateEthereum() {
      let base = buyableEffect("XLM", 12)
      return base
    },
    
    passiveGeneration() {
      let gen = new Decimal(1) 
      return gen;
    },
    
    update(diff) {
      player.XLM.ethereum = player.XLM.ethereum.add(buyableEffect("XLM", 12).times(diff))
    },
    buyables: {
    
        11: {
          cost(x) {
            let pow = new Decimal(2)
            let base = new Decimal(1).mul(Decimal.pow(pow, x.pow(1)))
            return base;
          },
          display() {
            return `  <b style="font-size:24px">Neural Network Base</b>
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
              "width": "400px",
              "height": "115px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
              "width": "400px",
              "height": " 115px",
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
            let eff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
            return eff
          },
          unlocked() {
            return true;
          }
        },
        
        12: {
          cost(x) {
            let pow = new Decimal(3)
            let base = new Decimal(10).mul(Decimal.pow(pow, x.pow(1)))
            return base;
          },
          display() {
            return `  <b style="font-size:24px">Ethereum Miner Tier I</b>
                            <h2>+${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Generation / sec</h2>
                              <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                            <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "width": "400px",
              "height": "115px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
              "width": "400px",
              "height": " 115px",
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
            let eff = new Decimal(0).add(Decimal.pow(1.24, x.pow(1))).sub(1)
            return eff
          },
          unlocked() {
            return true;
          }
        },
        13: {
          cost(x) {
            let pow = new Decimal(1.5)
            let base = new Decimal(5).mul(Decimal.pow(pow, x.pow(1)))
            return base;
          },
          display() {
            return `  <b style="font-size:24px">Improved CPU Clock Speed</b>
                            <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Gain</h2>
                              <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                            <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
          },
          canAfford() {
            return player[this.layer].ethereum.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(0,186,233,1) 0%, rgba(92,0,161,1) 100%)",
              "width": "400px",
              "height": "115px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color" : "#ffffff"
            }
            return {
              "background": "var(--backgroud)",
              "width": "400px",
              "height": " 115px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color" : "#ffffff"
            }
          },
          buy() {
            player[this.layer].ethereum = player[this.layer].ethereum.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let eff = new Decimal(0).add(Decimal.pow(1.15, x.pow(1)))
            return eff
          },
          unlocked() {
            return player.XLM.ethereum.gte(0.01)
          }
        },
    },
    
    tabFormat : {
        "Main" : {
            unlocked() {return true},
            content : [
             ["raw-html", () => {
                   return `You have <b style="font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.points)}</b> Stellar `
                                }],
                 ["raw-html", () => {
                   if (player.XLM.ethereum.gte(0.001)) { return `You have <b style="color: #567af0;font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.ethereum)}</b> Ethereum `
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
                   <b style='font-size:13px; color:#6e6d6d'>Improve XLM gain at <b style="color: #9e9d9d;font-size: 16px; text-shadow: 0px 0px 10px">${format(tmp.XLM.nextAt)}</b> points</b>`
                                }],
                "blank",
                "blank",
                ["row", [["buyable", 11]]],
                ["row", [["buyable", 12]]],
                ["row", [["buyable", 13]]]
            ]
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "X", description: "X: Reset for Stellar", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
