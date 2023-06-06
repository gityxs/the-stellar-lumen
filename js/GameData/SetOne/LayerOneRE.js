addLayer("main", {
  name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "INF", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0), // Currency 

      eth: new Decimal(0), // Currency 

      btc: new Decimal(0), // Currency 
      btcOnReset: new Decimal(0),
      btcState: new Decimal(0),
      
      teh: new Decimal(0), // Currency 
      tehOnReset: new Decimal(0),
      tehState: new Decimal(0),

      tp: new Decimal(0), // Currency

      tier: new Decimal(0),
      tierReq: new Decimal(10000),
      tierS1: new Decimal(10),
      tierS2: new Decimal(20),
      
      
      TCH1S: new Decimal(0),
      TCH2S: new Decimal(0)
    }
  },
  color: "#ffffff",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "Stellar", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() { return player.points }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
    Multiplier = new Decimal(1)
    let TM2Boost = new Decimal(1.5)
	  TM2Boost = TM2Boost.mul(hasMilestone("main", "TM7") ? 1.4 : 1)
    Multiplier = Multiplier.mul(buyableEffect("main", "Stellar Production"))
    Multiplier = Multiplier.mul(buyableEffect("main", "Ethereum Stellar Production"))
    Multiplier = Multiplier.mul(buyableEffect("main", "Bitcoin Stellar Production"))
    Multiplier = Multiplier.mul(player.main.tier.gte(2) ? new Decimal.pow(1.5, player.main.tier) : 1)
    Multiplier = Multiplier.mul(player.main.tier.gte(1) ? new Decimal.pow(TM2Boost, player.main.tier) : 1)
    Multiplier = Multiplier.mul(tmp.main.btcBoost)
    
    Multiplier = Multiplier.mul(challengeEff("main", "TCH1"))
    Multiplier = Multiplier.pow(buyableEffect("main", "Stellar Power Production"))
    Multiplier = Multiplier.pow(buyableEffect("main", "Ethereum Power Production"))
    Multiplier = Multiplier.pow(buyableEffect("main", "Bitcoin Power Production"))
    
    if (player.main.TCH1S.gte(1)) {
      Multiplier = Multiplier.pow(0.5)
    }
    return Multiplier
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
    return new Decimal(1)
  },
  passiveGeneration() {
    let Generation = new Decimal(1)
    return Generation
  },
  StellarPWR() {
    let PWR = new Decimal(1)
    PWR = PWR.mul(buyableEffect("main", "Stellar Power Production"))
    PWR = PWR.pow(buyableEffect("main", "Ethereum Power Production"))
    PWR = PWR.pow(buyableEffect("main", "Bitcoin Power Production"))
    if (player.main.TCH1S.gte(1)) {
    PWR = PWR.mul(tmp[this.layer].challenges["TCH1"].debuff)
    }
    return PWR
  },
  SoftcapIcalc() {
    let Base = player.main.tierS1
    let Tier = player.main.tier
    
    let Calculation = new Decimal.sub(Tier, Base).mul(0.05).add(1)
    return Calculation
  },
  SoftcapIIcalc() {
    let Base = player.main.tierS2
    let Tier = player.main.tier
    
    let Calculation = new Decimal.sub(Tier, Base).mul(0.1).add(1)
    return Calculation
  },
  tierUpReq() {
    let Base = player.main.tier
    Base = Base.add(1)
    let BasePower = new Decimal(1.125)
    let PowerI = new Decimal.div(player.main.tier, 17.5).add(1)
    
    let SoftcapI = new Decimal(1)
    SoftcapI = SoftcapI.add(player.main.tier.gte(10) ? 0.2 : 0)

    let Calculation = new Decimal.pow(3333, new Decimal.pow(BasePower, Base)).pow(PowerI)
    
    if (player.main.tier.gte(player.main.tierS1)) {
    return Calculation = Calculation.pow(tmp.main.SoftcapIcalc)
    }
    if (player.main.tier.gte(player.main.tierS2)) {
    return Calculation = Calculation.pow(tmp.main.SoftcapIIcalc)
    }
    return Calculation
  },

  tierUp() {
    player.main.tier = player.main.tier.add(1)
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)

    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Stellar Ethereum Production"] = new Decimal(0)
    player.main.buyables["Stellar Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)
    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Production"] = new Decimal(0)
    player.main.buyables["Ethereum Production"] = new Decimal(0)
  },
  
  t1Reset() {
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)

    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Stellar Ethereum Production"] = new Decimal(0)
    player.main.buyables["Stellar Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)
    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Production"] = new Decimal(0)
    player.main.buyables["Ethereum Production"] = new Decimal(0)
  },

  btcReset() {
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)

    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Stellar Ethereum Production"] = new Decimal(0)
    player.main.buyables["Stellar Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)
    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Production"] = new Decimal(0)
    player.main.buyables["Ethereum Production"] = new Decimal(0)

    player.main.btc = player.main.btc.add(tmp.main.btcCalc)
    player.main.btcState = player.main.btcState.add(1)
  },

  btcCalc() {
    let Base = player.main.points
    let Calculation = new Decimal.root(Base, 16).pow(2)
    Calculation = Calculation.pow(buyableEffect("main", "Bitcoin Power Production"))
    return Calculation
  },

  btcBoost() {
    let Base = player.main.btc
    let Calculation = new Decimal.pow(Base, 0.5)
    Calculation = Calculation.add(1)
    return Calculation
  },

  ethCalc() {
    let Base = new Decimal(0)
    Base = Base.add(buyableEffect("main", "Stellar Ethereum Production"))
    Base = Base.mul(buyableEffect("main", "Ethereum Production"))
    Base = Base.mul(buyableEffect("main", "Bitcoin Ethereum Production"))
    
    Base = Base.mul(challengeEff("main", "TCH2"))
    
    Base = Base.pow(buyableEffect("main", "Ethereum Power Production"))
    
    return Base
  },

  update(diff) {
    player.main.eth = player.main.eth.add((tmp.main.ethCalc).times(diff))

    player.main.btcOnReset = tmp.main.btcCalc
    
    
    
    const activeChallenge = player[this.layer].activeChallenge;
    if (activeChallenge && canCompleteChallenge(this.layer, activeChallenge)) {
      startChallenge(this.layer, activeChallenge);
      if (!maxedChallenge(this.layer, activeChallenge)) {
        startChallenge(this.layer, activeChallenge);
      }
    }
    
  },
  
  challenges: {
       "TCH1": {
          display() {
            var AC = tmp[this.layer].challenges[this.id]
            
            return `
            <b style="font-size:22px; text-shadow: 0px 0px 20px #ffffff">- ★ -</b>
            <br>
            <b style="font-size:45px; text-shadow: 0px 0px 10px #000000">Looming</b><br>
            <br> <br>
            <b style="font-size:17px; text-shadow: 0px 0px 10px #000000">Produce <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">^${format(AC.debuff)} Stellar</b> when in this challenge<br>
            <br>
            You need <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.goal)} Stellar</b> to finish this challenge once<br>
            ${format(challengeCompletions(this.layer, this.id))} / ${format(this.completionLimit)} completions<br>
            Boost from completations: <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.effect)}x Stellar</b>
            <br> <br>
            Entering this challenge will perform Bitcoin like reset!</b>`
          },
            completionLimit: new Decimal(1e12),
            goal() {
              let CC = challengeCompletions(this.layer, this.id)
            
            
            let PowerI = new Decimal(675)
            let PowerII = new Decimal.div(CC, 100).add(1)
            let PowerIII = new Decimal.div(CC, 200).add(1)
            let PowerIV = new Decimal.div(CC, 300).add(1)
            let PowerV = new Decimal.div(CC, 400).add(1)
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            PowerI = PowerI.pow(PowerIV)
            PowerI = PowerI.pow(PowerV)
            let Goal = new Decimal.pow(PowerI, CC + 1)
            return Goal
            },
            canComplete() {
            let CC = challengeCompletions(this.layer, this.id)
            
            
            let PowerI = new Decimal(675)
            let PowerII = new Decimal.div(CC, 100).add(1)
            let PowerIII = new Decimal.div(CC, 200).add(1)
            let PowerIV = new Decimal.div(CC, 300).add(1)
            let PowerV = new Decimal.div(CC, 400).add(1)
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            PowerI = PowerI.pow(PowerIV)
            PowerI = PowerI.pow(PowerV)
            return player.main.points.gte(new Decimal.pow(PowerI, CC + 1)) 
            },
            effect() {
              let CC = challengeCompletions(this.layer, this.id)
              
              
              let PowerI = new Decimal(7)
              let PowerII = new Decimal.div(CC, 100).add(1)
              let PowerIII = new Decimal.div(CC, 200).add(1)
              let PowerIV = new Decimal.div(CC, 300).add(1)
              let PowerV = new Decimal.div(CC, 400).add(1)
              
              PowerI = PowerI.pow(PowerII)
              PowerI = PowerI.pow(PowerIII)
              PowerI = PowerI.pow(PowerIV)
              PowerI = PowerI.pow(PowerV)
              
              let Effect = new Decimal.pow(PowerI, CC)
              return Effect
            },
            debuff() {
              let Base = new Decimal(0.5)
              let CC = new Decimal (challengeCompletions(this.layer, this.id))
              
              CC = CC.div(100).add(1)
              
              Base = Base.div(CC)
              return Base
            },
            unlocked() {return true},
            onEnter() {
              tmp.main.t1Reset()
             player.main.TCH1S = player.main.TCH1S.add(1)
              
            },
            onExit() {
             player.main.TCH1S = player.main.TCH1S.sub(1)
            },
            style() {
           return {
          "background-image": "url('images/TCH1.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulse 2s infinite",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "450px",
          "height": "auto",
          "border-radius": "20px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        },
       },
       
       "TCH2" : {
          display() {
            var AC = tmp[this.layer].challenges[this.id]
            
            return `
            <b style="font-size:22px; text-shadow: 0px 0px 20px #ffffff">- ★★ -</b>
            <br>
            <b style="font-size:45px; text-shadow: 0px 0px 10px #000000">Deprecated</b><br>
            <br> <br>
            <b style="font-size:17px; text-shadow: 0px 0px 10px #000000">Challenge <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">Looming</b> bonus doesn't apply and <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">^${format(AC.debuff)} debuff</b> is applied to <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">Ethereum</b> and <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">Stellar</b> aswell<br>
            <br>
            You need <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.goal)} Stellar</b> to finish this challenge once<br>
            ${format(challengeCompletions(this.layer, this.id))} / ${format(this.completionLimit)} completions<br>
            Boost from completations: <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.effect)}x Ethereum</b>
            <br> <br>
            Entering this challenge will perform Bitcoin like reset!</b>`
          },
            completionLimit: new Decimal(1e12),
            goal() {
              let CC = challengeCompletions(this.layer, this.id)
            
            
            let PowerI = new Decimal(1e12)
            let PowerII = new Decimal.div(CC, 100).add(1)
            let PowerIII = new Decimal.div(CC, 200).add(1)
            let PowerIV = new Decimal.div(CC, 300).add(1)
            let PowerV = new Decimal.div(CC, 400).add(1)
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            PowerI = PowerI.pow(PowerIV)
            PowerI = PowerI.pow(PowerV)
            let Goal = new Decimal.pow(PowerI, CC + 1)
            return Goal
            },
            canComplete()
            {
            let CC = challengeCompletions(this.layer, this.id)
            
            
            let PowerI = new Decimal(1e12)
            let PowerII = new Decimal.div(CC, 100).add(1)
            let PowerIII = new Decimal.div(CC, 200).add(1)
            let PowerIV = new Decimal.div(CC, 300).add(1)
            let PowerV = new Decimal.div(CC, 400).add(1)
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            PowerI = PowerI.pow(PowerIV)
            PowerI = PowerI.pow(PowerV)
            return player.main.points.gte(new Decimal.pow(PowerI, CC + 1))
            },
            effect() {
              let CC = challengeCompletions(this.layer, this.id)
              
              
              let PowerI = new Decimal(5)
              let PowerII = new Decimal.div(CC, 100).add(1)
              let PowerIII = new Decimal.div(CC, 200).add(1)
              let PowerIV = new Decimal.div(CC, 300).add(1)
              let PowerV = new Decimal.div(CC, 400).add(1)
              
              PowerI = PowerI.pow(PowerII)
              PowerI = PowerI.pow(PowerIII)
              PowerI = PowerI.pow(PowerIV)
              PowerI = PowerI.pow(PowerV)
              
              let Effect = new Decimal.pow(PowerI, CC)
              return Effect
            },
            debuff() {
              let Base = new Decimal(0.25)
              let CC = new Decimal(challengeCompletions(this.layer, this.id))
              
              CC = CC.div(85).add(1)
              
              Base = Base.div(CC)
              return Base
            },
            unlocked() {return true},
            onEnter() {
              tmp.main.t1Reset()
            },
            onExit() {
              
            },
            style() {
           return {
          "background-image": "url('images/TCH2.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulse 2s infinite",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "450px",
          "height": "auto",
          "border-radius": "20px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        },
       }
  },

  clickables: {
    "Tier Up": {
      title() {
        let state = player.main.tier
        return `<b style="font-size:35px">Tier Up #${state}</b><br>
    Reset EVERYTHING in exchange for a Tier for further progress<br>
    Need ${format(tmp.main.tierUpReq)} Points to Tier Up`
      },
      canClick() { return player.points.gte(tmp.main.tierUpReq) },
      onClick() {
        tmp.main.tierUp()
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/TIERC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulse 2s infinite",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "460px",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/TIERCT.png')",
          "background-size": "cover",
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

    "Bitcoin Reset": {
      title() {
        let state = player.main.btcState
        return `<b style="font-size:35px">Hardfork #${state}</b><br>
    Reset lower layer data for Bitcoin for plwerful upgrades<br>
    Hardfork for ${format(player.main.btcOnReset)} Bitcoin`
      },
      canClick() { return (player.main.btcOnReset.gte(1))
     },
      onClick() {
        tmp.main.btcReset()
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/BTCC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulse 2s infinite",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "460px",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "cover",
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
        return !player[layer].activeChallenge == "TCH2" || true
      }
    },
  },

  buyables: {
    "Stellar Point Production": {
      cost(x) {
        let PowerI = new Decimal(1.75)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
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
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        let Effect = new Decimal(1).mul(Decimal.pow(1.675, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(1.85)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(25).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Bigger Computer v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        let Effect = new Decimal(1).mul(Decimal.pow(1.5, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Stellar Ethereum Production": {
      cost(x) {
        let PowerI = new Decimal(1.55)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">RAM Sticks v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>+${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
        
        if (player.maim.cState2.gte(1)) return
        false
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        let Effect = new Decimal(1).mul(Decimal.pow(1.25, x.pow(1))).sub(1)
        
        
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM3") || player.main.cState2.lte(1);
      }
    },
    "Stellar Power Production": {
      cost(x) {
        let PowerI = new Decimal(2.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e9).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Additional Neural Network Layer v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        let Effect = new Decimal(1).mul(Decimal.pow(1.0025, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM4");
      }
    },
    "Cheaper Stellar": {
      cost(x) {
        let PowerI = new Decimal(5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e9).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Cheaper Components  v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>/${format(tmp[this.layer].buyables[this.id].effect)} Stellar Buyable Cost</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        let Effect = new Decimal(1).mul(Decimal.pow(4, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM4");
      }
    },

    "Ethereum Point Production": {
      cost(x) {
        let PowerI = new Decimal(1.9)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Neural Network+ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
      },
      canAfford() {
        return player[this.layer].eth.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/ETHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/ETHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].eth = player[this.layer].eth.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.75, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Ethereum Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(2.1)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(25).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Bigger Computer+ v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
      },
      canAfford() {
        return player[this.layer].eth.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/ETHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/ETHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].eth = player[this.layer].eth.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.5, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Ethereum Production": {
      cost(x) {
        let PowerI = new Decimal(2.3)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1250).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">RAM Sticks+ v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
      },
      canAfford() {
        return player[this.layer].eth.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/ETHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/ETHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].eth = player[this.layer].eth.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.75, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM5");
      }
    },
    "Ethereum Power Production": {
      cost(x) {
        let PowerI = new Decimal(5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e12).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">More Neural Network Inputs v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing & Stellar Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
      },
      canAfford() {
        return player[this.layer].eth.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/ETHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/ETHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].eth = player[this.layer].eth.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.005, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },
    "Cheaper Ethereum": {
      cost(x) {
        let PowerI = new Decimal(15)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e15).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Cheaper Components+ v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>/${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Buyable Cost</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
      },
      canAfford() {
        return player[this.layer].eth.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/ETHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/ETHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].eth = player[this.layer].eth.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(8, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },
    
    "Bitcoin Point Production": {
      cost(x) {
        let PowerI = new Decimal(3)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(75).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Bitcoin"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Neural Network++ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
      },
      canAfford() {
        return player[this.layer].btc.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/BTCC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].btc = player[this.layer].btc.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(3.5, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Bitcoin Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(3.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(500).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Bitcoin"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Bigger Computer++ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
      },
      canAfford() {
        return player[this.layer].btc.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/BTCC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].btc = player[this.layer].btc.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(3.5, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Bitcoin Ethereum Production": {
      cost(x) {
        let PowerI = new Decimal(4)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(2750).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Bitcoin"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">RAM Sticks++ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
      },
      canAfford() {
        return player[this.layer].btc.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/BTCC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].btc = player[this.layer].btc.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(3.5, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Bitcoin Power Production": {
      cost(x) {
        let PowerI = new Decimal(250)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e18).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Bitcoin"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">More Neural Network Outputs v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} & Bitcoin Hardforking & Ethereum Manufacturing & Stellar Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
      },
      canAfford() {
        return player[this.layer].btc.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/BTCC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].btc = player[this.layer].btc.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.0075, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },
    "Cheaper Bitcoin": {
      cost(x) {
        let PowerI = new Decimal(45)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e21).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Cheaper Components++ v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>/${format(tmp[this.layer].buyables[this.id].effect)} Bitcoin Buyable Cost</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
      },
      canAfford() {
        return player[this.layer].btc.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/BTCC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].btc = player[this.layer].btc.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(16, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },
    
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    { key: "", description: "Reset for what?", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
  milestones: {
    "TM1": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 1</b>`
      },
      done() { return player.main.tier.gte(1) },
      effectDescription: `<b style="font-size:22px">
    + Gain 1.25x Points each Tier`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
        }
      }
    },
    "TM2": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 2</b>`
      },
      done() { return player.main.tier.gte(2) },
      effectDescription: `<b style="font-size:22px">
    + Gain 1.5x Stellar each Tier`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
        }
      }
    },
    "TM3": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 3</b>`
      },
      done() { return player.main.tier.gte(3) },
      effectDescription: `<b style="font-size:22px">
    + Unlock Ethereum Currency`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
        }
      }
    },
    "TM4": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 5</b>`
      },
      done() { return player.main.tier.gte(5) },
      effectDescription: `<b style="font-size:22px">
        + Gain 1.5x Ethereum each Tier<br>
        + Unlock 2 new Stellar buyables`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
        }
      }
    },
    "TM5": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 7</b>`
      },
      done() { return player.main.tier.gte(7) },
      effectDescription: `<b style="font-size:22px">
    + Improve Tier 1 milestone effect by 1.2x<br>
    + Unlock 2 new Ethereum buyables`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
        }
      }
    },
    "TM6": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 9</b>`
      },
      done() { return player.main.tier.gte(9) },
      effectDescription: `<b style="font-size:22px">
        + Unlock Time Point currency<br>
        + Unlock Bitcoin<br>
        + Unlock Basic Tier Automation`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
        }
      }
    },
    "TM7": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 13</b>`
      },
      done() { return player.main.tier.gte(13) },
      effectDescription: `<b style="font-size:22px">
        + Unlock 2 new Ethereum buyable<br>
        + Unlock 2 new Bitcoin buyable<br>
        + Improve Tier 2 milestone effect by 1.4x`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
        }
      }
    },
    "TM8": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 17</b>`
      },
      done() { return player.main.tier.gte(17) },
      effectDescription: `<b style="font-size:22px">
        + Unlock 2 new Stellar buyables<br>
        + Unlock Tether`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
        }
      }
    },
  },
  tabFormat: {
    "Main Progression": {
      content: [
      ['raw-html', () => {
          return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.points)}</HI> Points</MA>`
                }],
       "blank",
       "h-line",
       "blank",
       ["microtabs", "Main", { 'border-width': '0px' }],
        ]
    },
    "Tier Tab": {
      unlocked() { return player.points.gte(10000) || player.main.tier.gte(1) },
      content: [
    "blank",
    ["raw-html", () => {
          return `<MA style="font-size: 28px; color: #c7c7c7">You are at Tier <HI style="font-size: 32px; text-shadow: 0px 0px 20px">${formatNoDecimals(player.main.tier)}</HI></MA>`
    }],

    ["raw-html", () => {
          return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    "blank",
        ["raw-html", () => {
          if (player.main.tier.gte(10)) {
          return `<MA style="font-size: 20px; color: #7a1818">Softcap I: After Tier <HI style="font-size: 24px; color: #a12222; text-shadow: 0px 0px 20px">${formatNoDecimals(player.main.tierS1)}</HI>, it's cost requirement is increased by ^${format(tmp.main.SoftcapIcalc)}</MA>`
          }
          return ``
    }],
    ["raw-html", () => {
          if (player.main.tier.gte(20)) {
          return `<MA style="font-size: 20px; color: #7a182c">Softcap II: After Tier <HI style="font-size: 24px; color: #a12239; text-shadow: 0px 0px 20px">${formatNoDecimals(player.main.tierS2)}</HI>, it's cost requirement is increased by ^${format(tmp.main.SoftcapIIcalc)}</MA>`
          }
          return ``
    }],
    "blank",
    ["row", [["clickable", "Tier Up"]]],
    "blank",
    "milestones"
    ],
    },
      "Time Tab": {
      unlocked() { return hasMilestone("main", "TM6") },
      content: [
    "blank",
    ["raw-html", () => {
          return `<MA style="font-size: 28px; color: #c7c7c7">You own <HI style="font-size: 32px; text-shadow: 0px 0px 20px">${formatNoDecimals(player.main.tp)}</HI> Time Points</MA>`
    }],

    ["raw-html", () => {
          return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
["row", [["challenge", "TCH1"]]],
["row", [["challenge", "TCH2"]]],
    "blank",
    "blank",
    ],
    },
  },

  microtabs: {
    Main: {
      "Stellar": {
        content: [
       "blank",
       "h-line",
       "blank",
         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.points)}</HI> Stellar<sup>${format(tmp.main.StellarPWR)}</sup></MA>`
        }],
            ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.resetGain)}</HI> Stellar / sec</MA>`
            }],
       ["row", [["buyable", "Stellar Point Production"]]],
       ["row", [["buyable", "Stellar Production"]]],
       ["row", [["buyable", "Stellar Ethereum Production"]]],
       ["row", [["buyable", "Stellar Power Production"]]],
       ["row", [["buyable", "Cheaper Stellar"]]],
       ],
      },
      "Ethereum": {
        unlocked() { 
          return (player.main.eth.gte(1) || hasMilestone("main", "TM3")) && !inChallenge("main", "TCH2")
        },
        content: [
         "blank",
         "h-line",
         "blank",
         
         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.eth)}</HI> Ethereum</MA>`
        }],
        ['raw-html', () => {
            return `<MA style='font-size: 25px'>You manufacture <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(tmp.main.ethCalc)}</HI> Ethereum / sec</MA>`
        }],
       ["row", [["buyable", "Ethereum Point Production"]]],
       ["row", [["buyable", "Ethereum Stellar Production"]]],
       ["row", [["buyable", "Ethereum Production"]]],
       ["row", [["buyable", "Ethereum Power Production"]]],
       ["row", [["buyable", "Cheaper Ethereum"]]],
       ],
      },
      "Bitcoin": {
        unlocked() { return player.main.btc.gte(1) || hasMilestone("main", "TM6") },
        content: [
        "blank",
        "h-line",
        "blank",
         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.btc)}</HI> Bitcoin</MA>`
        }],
        ['raw-html', () => {
            return `<MA style='font-size: 25px'>Your Bitcoins are translated into <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(tmp.main.btcBoost)}</HI>x Stellar</MA>`
        }],
       ["row", [["clickable", "Bitcoin Reset"]]],
       ["row", [["buyable", "Bitcoin Point Production"]]],
       ["row", [["buyable", "Bitcoin Stellar Production"]]],
       ["row", [["buyable", "Bitcoin Ethereum Production"]]],
       ["row", [["buyable", "Bitcoin Power Production"]]],
       ["row", [["buyable", "Cheaper Bitcoin"]]]
       ],
      }
    }
  },
  layerShown() { return true }
})