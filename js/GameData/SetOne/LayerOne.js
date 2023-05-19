addLayer("SET", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        // Main Currency 
		    points: new Decimal(0),
		    
		    // Progression Currencies
		    tier: new Decimal(0),
		    tierNext: new Decimal(1),
		    superTier: new Decimal(0),
		    tierRequirement: new Decimal(25000),
		    superTierRequirement: new Decimal(1e90),
		    
		    // Ethereum Set
		    ETH: new Decimal(0),
		    
		    // Bitcoin Set
		    BTC: new Decimal(0),
		    BTCGain: new Decimal(0),
		    BTCStatus: new Decimal(0),
		    
		    // Miscellaneous
		    timePoints: new Decimal(0)
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Stellar", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        Multiplier = new Decimal(1)
        Multiplier = Multiplier.mul(buyableEffect("SET", 12))
        Multiplier = Multiplier.mul(buyableEffect("SET", 21))
        Multiplier = Multiplier.mul(buyableEffect("SET", 91))
        Multiplier = Multiplier.mul(tmp.SET.BTCBoost)
        Multiplier = Multiplier.mul(tmp.SET.tickSpeedCalculation)
        Multiplier = Multiplier.mul(Decimal.pow(2, player.SET.tier))
        return Multiplier
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
      let Generation = new Decimal(1)
      return Generation
    },
    
    ETHPerSecondCalculation() {
      let Base = new Decimal(0)
      let TierBoostI = new Decimal(1).add(player.SET.tier.gte(3) ? 0.5 : 0)
      Base = Base.add(buyableEffect("SET", 13))
      Base = Base.add(buyableEffect("SET", 92))
      Base = Base.mul(Decimal.pow(TierBoostI, player.SET.tier))
      Base = Base.mul(tmp.SET.tickSpeedCalculation)
      return Base
    },
    
    tierUp() {
      player.points = new Decimal(0)
      player.SET.points = new Decimal(0)
      player.SET.ETHPerSecond = new Decimal(0)
      player.SET.ETH = new Decimal(0)
      
      player.SET.buyables[11] = new Decimal(0)
      player.SET.buyables[12] = new Decimal(0)
      player.SET.buyables[13] = new Decimal(0)
      player.SET.buyables[14] = new Decimal(0)
      
      player.SET.buyables[21] = new Decimal(0)
      player.SET.buyables[22] = new Decimal(0)
      
      player.SET.buyables[31] = new Decimal(0)
      player.SET.buyables[32] = new Decimal(0)
      player.SET.buyables[33] = new Decimal(0)
      
      player.SET.tier = player.SET.tier.add(1)
      player.SET.tierRequirement = player.SET.tierRequirement.mul(1e3)
    },
    
    BTCReset() {
      player.points = new Decimal(0)
      player.SET.points = new Decimal(0)
      player.SET.ETHPerSecond = new Decimal(0)
      player.SET.ETH = new Decimal(0)
      
      player.SET.buyables[11] = new Decimal(0)
      player.SET.buyables[12] = new Decimal(0)
      player.SET.buyables[13] = new Decimal(0)
      player.SET.buyables[14] = new Decimal(0)
      
      player.SET.buyables[21] = new Decimal(0)
      player.SET.buyables[22] = new Decimal(0)
      
      player.SET.BTC = player.SET.BTC.add(player.SET.BTCGain)
      player.SET.BTCStatus = player.SET.BTCStatus.add(1)
    },
    
    calculateBTCGain() {
      let Base = new Decimal.div(player.points, 1e6)
      let Power = new Decimal(0.5)
      let Calculation = new Decimal.pow(Base, Power)
      return Calculation
    },
    
    BTCBoost() {
      let Base = player.SET.BTC
      let Power = new Decimal(0.75)
      let Calculation = new Decimal.pow(Base,Power)
      Calculation = Calculation.add(1)
      return Calculation
    },
    
    tickSpeedCalculation() {
      let Base = new Decimal(1)
      Base = Base.mul(buyableEffect("SET", 33))
      return Base
    },
    
    update(diff) {
      let Minute = new Decimal(0.017)
      player.SET.ETH = player.SET.ETH.add((tmp.SET.ETHPerSecondCalculation).times(diff))
      
      player.SET.BTCGain = tmp.SET.calculateBTCGain
      
      player.SET.timePoints = player.SET.timePoints.add((Minute).times(diff))
    },
 
    
    clickables: {
        11: {
          title() {
             let state = player.SET.tier
             return `<b style="font-size:35px">Tier Up #${state}</b><br>
            Reset EVERYTHING in exchange for a Tier for further progress<br>
            Need ${format(player.SET.tierRequirement)} Points to Tier Up`},
            canClick() { return player.points.gte(player.SET.tierRequirement) },
            onClick() {
                  tmp.SET.tierUp()
            },
            style() {
              if (tmp[this.layer].clickables[this.id].canClick) return {
                "background": "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(176,176,176,1) 100%)",
                "width": "460px",
                "height": "130px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 15px #000000",
                "color": "#000000"
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
              return true
            }
        },
        
        12: {
          title() {
             let state = player.SET.BTCStatus
             return `<b style="font-size:35px">Hardfork #${state}</b><br>
            Reset Stellar and Ethereum for Bitcoin for further progression<br>
            Reset for ${format(player.SET.BTCGain)} Bitcoin`},
            canClick() { return player.SET.BTCGain.gte(1)
            },
            onClick() {
                  tmp.SET.BTCReset()
            },
            style() {
              if (tmp[this.layer].clickables[this.id].canClick) return {
                "background": "linear-gradient(-180deg, rgba(175,109,3,1) 0%, rgba(225,176,0,1) 100%)",
                "width": "460px",
                "height": "130px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 15px #000000",
                "color": "#ffffff"
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
              return player.SET.tier.gte(3)
            }
        },
    },
    
    buyables: {
        11: {
          cost(x) {
            let PowerI = new Decimal(2.25)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            Calculation = Calculation.div(buyableEffect("SET", 14))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Neural Network v${format(player[this.layer].buyables[this.id], 0)}</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/XLMCan.png')",
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
              "background-image" : "url('../image-folder/XLMCant.png')",
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
            let PowerI = new Decimal(3.5)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
            Calculation = Calculation.div(buyableEffect("SET", 14))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Bigger Computer v${format(player[this.layer].buyables[this.id], 0)}</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/XLMCan.png')",
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
              "background-image" : "url('../image-folder/XLMCant.png')",
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
            let Effect = new Decimal(1).mul(Decimal.pow(1.5, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.SET.buyables[11].gte(7);
          }
        },
        
        13: {
          cost(x) {
            let PowerI = new Decimal(3.5)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
            Calculation = Calculation.div(buyableEffect("SET", 14))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">RAM Sticks v${format(player[this.layer].buyables[this.id], 0)}</b>
                    <h2>+${format(tmp[this.layer].buyables[this.id].effect)} Ethereum / sec</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/XLMCan.png')",
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
              "background-image" : "url('../image-folder/XLMCant.png')",
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
            let Effect = new Decimal(1).mul(Decimal.pow(1.25, x.pow(1))).sub(1)
            return Effect;
          },
          unlocked() {
            return player.SET.tier.gte(1)
          }
        },
        
        14: {
          cost(x) {
            let PowerI = new Decimal(10)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1e6).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Cheaper Components v${format(player[this.layer].buyables[this.id], 0)}</b>
                    <h2>/${format(tmp[this.layer].buyables[this.id].effect)} previous Stellar buyable prices</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/XLMCan.png')",
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
              "background-image" : "url('../image-folder/XLMCant.png')",
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
            return player.SET.tier.gte(2)
          }
        },
        
        21: {
          cost(x) {
            let PowerI = new Decimal(3)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">More Stellar v${format(player[this.layer].buyables[this.id], 0)}</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
          },
          canAfford() {
            return player[this.layer].ETH.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/ETHCan.png')",
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
              "background-image" : "url('../image-folder/ETHCant.png')",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].ETH = player[this.layer].ETH.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(2.25, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.SET.tier.gte(1)
          }
        },
        
        22: {
          cost(x) {
            let PowerI = new Decimal(5)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Additional Neural Network v${format(player[this.layer].buyables[this.id], 0)}</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
          },
          canAfford() {
            return player[this.layer].ETH.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/ETHCan.png')",
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
              "background-image" : "url('../image-folder/ETHCant.png')",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].ETH = player[this.layer].ETH.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(2.5, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.SET.tier.gte(2)
          }
        },
        
        31: {
          cost(x) {
            let PowerI = new Decimal(10)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Extra Stellar v${format(player[this.layer].buyables[this.id], 0)}</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
          },
          canAfford() {
            return player[this.layer].BTC.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/BTCCan.png')",
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
              "background-image" : "url('../image-folder/BTCCant.png')",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].BTC = player[this.layer].BTC.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(4, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.SET.tier.gte(3)
          }
        },
        
        32: {
          cost(x) {
            let PowerI = new Decimal(15)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">More Ethereum v${format(player[this.layer].buyables[this.id], 0)}</b>
                            <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar</h2><br>
                            <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
          },
          canAfford() {
            return player[this.layer].BTC.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image": "url('../image-folder/BTCCan.png')",
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
              "background-image": "url('../image-folder/BTCCant.png')",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].BTC = player[this.layer].BTC.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(3, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.SET.tier.gte(4)
          }
        },
        
        33: {
          cost(x) {
            let PowerI = new Decimal(2.75)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Faster CPU Clock Speed v${format(player[this.layer].buyables[this.id], 0)}</b>
                            <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Tickspeed</h2><br>
                            <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
          },
          canAfford() {
            return player[this.layer].BTC.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image": "url('../image-folder/BTCCan.png')",
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
              "background-image": "url('../image-folder/BTCCant.png')",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].BTC = player[this.layer].BTC.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(1.11, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.SET.tier.gte(4)
          }
        },
        
        91: {
          cost(x) {
            let PowerI = new Decimal(1.01)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Time Stellar v${format(player[this.layer].buyables[this.id], 0)}</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
          },
          canAfford() {
            return player[this.layer].timePoints.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/TimeCan.png')",
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
              "background-image" : "url('../image-folder/TimeCant.png')",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].timePoints = player[this.layer].timePoints.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.SET.tier.gte(2)
          }
        },
        
        92: {
          cost(x) {
            let PowerI = new Decimal(1.025)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Time Ethereum v${format(player[this.layer].buyables[this.id], 0)}</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
          },
          canAfford() {
            return player[this.layer].timePoints.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/TimeCan.png')",
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
              "background-image" : "url('../image-folder/TimeCant.png')",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].timePoints = player[this.layer].timePoints.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.SET.tier.gte(2)
          }
        },
        
        93: {
          cost(x) {
            let PowerI = new Decimal(1.04)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Time Bitcoin v${format(player[this.layer].buyables[this.id], 0)}</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Bitcoin</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
          },
          canAfford() {
            return player[this.layer].timePoints.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/TimeCan.png')",
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
              "background-image" : "url('../image-folder/TimeCant.png')",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].timePoints = player[this.layer].timePoints.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.SET.tier.gte(5)
          }
        },
        
        94: {
          cost(x) {
            let PowerI = new Decimal(1.01)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Time Tickspeed v${format(player[this.layer].buyables[this.id], 0)}</b>
                            <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Tickspeed</h2><br>
                            <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
          },
          canAfford() {
            return player[this.layer].timePoints.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image": "url('../image-folder/TimeCan.png')",
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
              "background-image": "url('../image-folder/TimeCant.png')",
              "height": " 130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player[this.layer].timePoints = player[this.layer].timePoints.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.SET.tier.gte(5)
          }
        },
    },
    
    milestones: {
        1: {
            requirementDescription: `<b style="font-size:28px">TIER 1</b>`,
                done() {return player.SET.tier.gte(1)},
                effectDescription: `<b style="font-size:22px">2x Stellar each Tier ( starting from this ) & 1 new Stellar buyable & unlock Ethereum</b>`,
            style() {
                if (tmp[this.layer].milestones[this.id].done) return {
                    "background" : "#474747",
                    "width" : "auto",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
                return {
                    "background" : "#dcdcdc",
                    "width" : "auto",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
            }
            
        },
        2: {
            requirementDescription: `<b style="font-size:28px">TIER 2</b>`,
                done() {return player.SET.tier.gte(2)},
                effectDescription: `<b style="font-size:22px">1 new Stellar & Ethereum buyable & unlock Time Points</b>`,
            style() {
                if (tmp[this.layer].milestones[this.id].done) return {
                    "background" : "#474747",
                    "width" : "auto",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
                return {
                    "background" : "#dcdcdc",
                    "width" : "auto",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
            }
        },
        3: {
            requirementDescription: `<b style="font-size:28px">TIER 3</b>`,
                done() {return player.SET.tier.gte(3)},
                effectDescription: `<b style="font-size:22px">1.5x Ethereum each Tier ( starting from this ) & unlock Bitcoin</b>`,
            style() {
                if (tmp[this.layer].milestones[this.id].done) return {
                    "background" : "#474747",
                    "width" : "auto",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
                return {
                    "background" : "#dcdcdc",
                    "width" : "auto",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
            }
        },
        4: {
            requirementDescription: `<b style="font-size:28px">TIER 4</b>`,
                done() {return player.SET.tier.gte(4)},
                effectDescription: `<b style="font-size:22px">Unlock 2 new Bitcoin buyables & unlock Tickspeed</b>`,
            style() {
                if (tmp[this.layer].milestones[this.id].done) return {
                    "background" : "#474747",
                    "width" : "auto",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
                return {
                    "background" : "#dcdcdc",
                    "width" : "auto",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
            }
        },
        5: {
            requirementDescription: `<b style="font-size:28px">TIER 5</b>`,
                done() {return player.SET.tier.gte(5)},
                effectDescription: `<b style="font-size:22px">Unlock 2 new Time Point buyables & additional 2x Stellar each Tier ( starting from this )</b>`,
            style() {
                if (tmp[this.layer].milestones[this.id].done) return {
                    "background" : "#474747",
                    "width" : "auto",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
                return {
                    "background" : "#dcdcdc",
                    "width" : "auto",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
            }
        },
    },
    
    tabFormat : {
    "Stellar": {
    unlocked() { return true },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You have <HI style="font-size: 32px; text-shadow: 0px 0px 20px">${format(player.SET.points)}</HI> Stellar</MA>`
    }],
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.SET.resetGain)}</HI> Stellar / sec</MA>`
        }],
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
        }],
    "blank",
    ["row", [["buyable", 11]]],
    ["row", [["buyable", 12]]],
    ["row", [["buyable", 13]]],
    ["row", [["buyable", 14]]]
    ],
    }, 
    "Ethereum": {
    unlocked() { return player.SET.tier.gte(1) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You have <HI style="font-size: 32px; color: #2150eb; text-shadow: 0px 0px 20px">${format(player.SET.ETH)}</HI> Ethereum</MA>`
    }],
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #1839a8; text-shadow: 0px 0px 20px">${format(tmp.SET.ETHPerSecondCalculation)}</HI> Ethereum / sec</MA>`
        }],
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
        }],
    "blank",
    ["row", [["buyable", 21]]],
    ["row", [["buyable", 22]]],
    ],
    }, 
    "Bitcoin": {
    unlocked() { return player.SET.tier.gte(3) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You have <HI style="font-size: 32px; color: #ffa41c; text-shadow: 0px 0px 20px">${format(player.SET.BTC)}</HI> Bitcoin</MA>`
    }],
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">Your Bitcoins are translated as <HI style="font-size: 32px; color: #ffa41c; text-shadow: 0px 0px 20px">x${format(tmp.SET.BTCBoost)}</HI> Stellar boost</MA>`
    }],
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">Game is stimulated in <HI style="font-size: 32px; color: #eb3455; text-shadow: 0px 0px 20px">x${format(tmp.SET.tickSpeedCalculation)}</HI> ticks in second</MA>`
    }],
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
        }],
    "blank",
    ["row", [["clickable", 12]]],
    "blank",
    ["row", [["buyable", 31]]],
    ["row", [["buyable", 32]]],
    ["row", [["buyable", 33]]],
    ],
    },
    "Time Tab": {
    unlocked() { return player.SET.tier.gte(2) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You have <HI style="font-size: 32px; color: #eb2e21; text-shadow: 0px 0px 20px">${format(player.SET.timePoints)}</HI> Time Points</MA>`
    }],
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
        }],
    ["raw-html", () => {
    return `<MA style="font-size: 16px; color: #595959">Note that Time Points or it's buyables don't get reset by Tier Up , Bitcoin Hardfork etc. =)</MA>`
        }],
    "blank",
    ["row", [["buyable", 91]]],
    ["row", [["buyable", 92]]],
    ["row", [["buyable", 93]]],
    ["row", [["buyable", 94]]],
    "blank",
    ],
    },
    "Tier Tab": {
    unlocked() { return player.points.gte(20000) || player.SET.tier.gte(1) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You are at Tier <HI style="font-size: 32px; text-shadow: 0px 0px 20px">${formatNoDecimals(player.SET.tier)}</HI></MA>`
    }],
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
        }],
    "blank",
    ["row", [["clickable", 11]]],
    "blank",
    "milestones"
    ],
    },
    },
   
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
