const HEADERs = `<b style="font-size:25px">`
const HEADERe = `</b>`

addLayer("main", {
  name: "INF^2",
  symbol: "INF^2",
  position: 0,
  startData()
  {
    return {
      unlocked: true,
      points: new Decimal(0),
      eth: new Decimal(0),
      tier: new Decimal(0),

      limit: new Decimal(30),

      unit: new Decimal(1),
      unitLimit: new Decimal(1e10),

      factories: new Decimal(0),
      oreos: new Decimal(0),
      
      TCH1S: new Decimal(0),
      
      auto:{
      T1AT: false,
    },
    }
  },
  color: "#ffffff",
  requires: new Decimal(2),
  resource: "Stellar",
  baseResource: "points",
  baseAmount() { return player.points },
  type: "normal",
  exponent: "1e-3000",
  gainMult()
  {
    mult = new Decimal(1)
    mult = mult.mul(buyableEffect("main", "Stellar Production"))
    mult = mult.mul(buyableEffect("main", "Ethereum Booster"))
    if (player.main.tier.gte(7)) {
      mult = mult.mul(tmp.main.StellarMagnitudeBonus)
      
    }
    if (player.main.TCH1S.gte(1)) {
      mult = mult.pow(tmp[this.layer].challenges["Looming"].debuff)
    }
    mult = mult.mul(tmp.main.OreoStellarBoost)
    mult = mult.mul(challengeEff("main", "Looming"))
    return mult
  },
  gainExp()
  {
    return new Decimal(1)
  },
  passiveGeneration() {
    let gen = new Decimal(1)
    return gen
  },
  tierCostCalc() {
    let Base = new Decimal(50)
    let Tier = player.main.tier
    let Layer = new Decimal(1.35)

    let PowerI = new Decimal.div(player.main.tier, 20).add(1)
    let PowerII = new Decimal.div(player.main.tier, 40).add(1)
    let PowerIII = new Decimal.div(player.main.tier, 80).add(1)
    let PowerIV = new Decimal.div(player.main.tier, 160).add(1)
    let PowerV = new Decimal.div(player.main.tier, 320).add(1)
    let PowerVI = new Decimal.div(player.main.tier, 640).add(1)
    let PowerVII = new Decimal.div(player.main.tier, 1280).add(1)
    let PowerVIII = new Decimal.div(player.main.tier, 2560).add(1)

    let ScaleI = new Decimal.pow(10, Tier)
    let CostI = new Decimal.mul(ScaleI, Tier)

    let ScaleII = new Decimal.pow(5, Tier)
    let CostII = new Decimal.mul(ScaleII, Tier)

    let Calculation = new Decimal.mul(CostI, CostII)
    Calculation = Calculation.pow(Layer)
    Calculation = Calculation.pow(PowerI)
    Calculation = Calculation.pow(PowerII)
    Calculation = Calculation.pow(PowerIII)
    Calculation = Calculation.pow(PowerIV)
    Calculation = Calculation.pow(PowerV)
    Calculation = Calculation.pow(PowerVI)
    Calculation = Calculation.pow(PowerVII)
    Calculation = Calculation.pow(PowerVIII)

    Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar Tier"))
    return Calculation
  },
  tierUp() {
    player.main.tier = player.main.tier.add(1)
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)
    player.main.unit = new Decimal(1.01)
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)

    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Increaser"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Booster"] = new Decimal(0)
  },
  
  type1reset() {
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)
    player.main.unit = new Decimal(1.01)
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)

    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Increaser"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Booster"] = new Decimal(0)
  },

  factoryInvestment() {
    player.main.factories = player.main.factories.add(1)
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)
    player.main.unit = new Decimal(1.0)
    player.main.tier = new Decimal(0)
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar Tier"] = new Decimal(0)

    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Increaser"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Booster"] = new Decimal(0)
    player.main.buyables["Ethereum Booster"] = new Decimal(0)
  },

  factoryInvestmentCostCalc() {
    let Base = new Decimal(15)
    
    let Tier = player.main.factories
    let Layer = new Decimal(1)
    let Calculation = new Decimal(15)
    let Increase = new Decimal.mul(Tier, 3)
    
    Calculation = Calculation.add(Increase)

    if (hasMilestone("main", "TM9")) {
      Calculation = Calculation.sub(1)
    }
    if (hasMilestone("main", "TM10")) {
      Calculation = Calculation.sub(1)
    }
    return Calculation
  },

  ethGainCalc() {
    let Stellar = player.main.points
    Stellar = Stellar.add(1)
    let Generation = new Decimal.pow(Stellar, 0.25)
    Generation = Generation.add(1)

    Generation = Generation.mul(buyableEffect("main", "Ethereum Booster"))
    return Generation
  },

  oreoGainCalc() {
    let Factory = player.main.factories

    let Production = new Decimal.pow(3, Factory).sub(1)

    return Production
  },

  StellarMagnitude() {
    let Stellar = player.main.points
    Stellar = Stellar.add(1)
    let Calculation = new Decimal.log(Stellar, 10)

    let Limit = tmp.main.StellarMagnitudeLimit
    if (Calculation.gte(Limit)) {
      return Calculation = Limit
    }
    return Calculation
  },

  StellarMagnitudeBonus() {
    let Stellar = player.main.points
    Stellar = Stellar.add(1)
    Power = new Decimal(2)

    Power = Power.add(buyableEffect("main", "Ethereum Stellar Mag Booster"))
    if (hasMilestone("main", "TM8")) {
      Power = Power.mul(1.5)
    }
    if (hasMilestone("main", "TM9")) {
      Power = Power.mul(1.5)
    }
    let CalculationI = tmp.main.StellarMagnitude
    let CalculationII = new Decimal.pow(CalculationI, Power)

    CalculationII = CalculationII.add(1)
    return CalculationII
  },

  StellarMagnitudeLimit() {
    let Limit = new Decimal(30)
    Limit = Limit.add(buyableEffect("main", "Ethereum Stellar Mag Increaser"))

    if (hasMilestone("main", "TM6")) {
      Limit = Limit.mul(2)
    }

    return Limit
  },

  StellarMagBonusDisplay() {
    let Boost = new Decimal(2)
    Boost = Boost.add(buyableEffect("main", "Ethereum Stellar Mag Booster"))
    if (hasMilestone("main", "TM8")) {
      Boost = Boost.mul(1.5)
    }
    if (hasMilestone("main", "TM9")) {
      Boost = Boost.mul(1.5)
    }
    return Boost
  },

  Accelerant() {
    let Acceleration = new Decimal(1.002)
    Acceleration = Acceleration.add(tmp.main.OreoAccelerantBoostBonus)
    if (hasMilestone("main", "TM7")) {
      Acceleration = Acceleration.add(0.002)
    }
    if (hasMilestone("main", "TM8")) {
      Acceleration = Acceleration.add(0.004)
    }
    if (hasMilestone("main", "TM10")) {
      Acceleration = Acceleration.add(0.008)
    }
    
    return Acceleration
  },

  AccelerantBonus() {
    let Unit = player.main.unit
    let Power = new Decimal(0.5)

    let Calculation = new Decimal.pow(Unit, Power)
    Calculation = Calculation.add(1)
    return Calculation
  },

  AccelerantLimit() {
    let Limit = new Decimal(1e10)
    if (hasMilestone("main", "TM7")) {
      Limit = Limit.pow(2)
    }
    if (hasMilestone("main", "TM8")) {
      Limit = Limit.pow(2)
    }
    if (hasMilestone("main", "TM10")) {
      Limit = Limit.pow(2)
    }
    Limit = Limit.pow(tmp.main.OreoAccelerantLimitBoost)
    return Limit
  },

  OreoPointBoost() {
    let Oreo = player.main.oreos
    let Calculation = new Decimal.pow(Oreo, 7)
    Calculation = Calculation.add(1)

    return Calculation
  },

  OreoStellarBoost() {
    let Oreo = player.main.oreos
    let Calculation = new Decimal.pow(Oreo, 6)
    Calculation = Calculation.add(1)

    return Calculation
  },

  OreoAccelerantLimitBoost() {
    let Oreo = player.main.oreos
    let Calculation = new Decimal.pow(Oreo, 0.05)
    Calculation = Calculation.add(1)

    return Calculation
  },
  
  OreoAccelerantBoostBonus() {
    let Oreo = player.main.oreos
    let Logarithm = new Decimal(10)
    
    let CalculationI = new Decimal.log(Oreo, Logarithm)
    CalculationIn= CalculationI.add(1)
    
    let CalculationII = new Decimal.div(CalculationI, 50)
    
    return CalculationII
  },


  update(diff, delta) {
    if (player.main.points.gte(1) && player.main.tier.gte(5)) {
      player.main.eth = player.main.eth.add((tmp.main.ethGainCalc).times(diff))
    }
    if (player.main.tier.gte(9)) {
      player.main.unit = (player.main.unit.mul(tmp.main.Accelerant))
    }
    if (player.main.unit.gte(player.main.unitLimit)) {
      return player.main.unit = player.main.unitLimit
    }
    player.main.unitLimit = tmp.main.AccelerantLimit
    player.main.limit = tmp.main.StellarMagnitudeLimit

    player.main.oreos = player.main.oreos.add((tmp.main.oreoGainCalc).times(diff))
    
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Stellar Point Production")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Stellar Production")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Cheaper Stellar")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Cheaper Stellar Tier")
    
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Ethereum Point Production")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Ethereum Stellar Mag Increaser")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Ethereum Stellar Mag Booster")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Ethereum Booster")
    
    const activeChallenge = player[this.layer].activeChallenge;
    if (activeChallenge && canCompleteChallenge(this.layer, activeChallenge)) {
      startChallenge(this.layer, activeChallenge);
      if (!maxedChallenge(this.layer, activeChallenge)) {
        startChallenge(this.layer, activeChallenge);
      }
    }
  },
  challenges: {
    "Looming": {
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
            Entering this challenge will perform Tier like reset!</b>`
      },
      completionLimit: new Decimal(1e12),
      goal() {
                let x = new Decimal(challengeCompletions(this.layer, this.id))
        
                let PowerI = new Decimal(10000)
                let PowerII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
                let PowerIII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
                let PowerIV = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        
                PowerI = PowerI.pow(PowerII)
                PowerI = PowerI.pow(PowerIII)
                PowerI = PowerI.pow(PowerIV)
                let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Calculation;
      },
      canComplete() {
        let x = new Decimal(challengeCompletions(this.layer, this.id))
        
        let PowerI = new Decimal(10000)
        let PowerII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIV = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        
        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        let Check = player.main.points.gte(Calculation)
        return Check;
      },
      effect() {
        let x = new Decimal(challengeCompletions(this.layer, this.id))
        
        let PowerI = new Decimal(100)
        let PowerII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIV = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        
        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      debuff() {
        let Base = new Decimal(0.05)
        let CC = new Decimal(challengeCompletions(this.layer, this.id))

        CC = CC.div(150).add(1)

        Base = Base.div(CC)
        return Base
      },
      unlocked() { return true },
      onEnter() {
        tmp.main.type1reset()
        player.main.TCH1S = new Decimal(1)

      },
      onExit() {
        player.main.TCH1S = new Decimal(0)
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
  },

  clickables: {
    "Tier Up": {
      title() {
        let state = player.main.tier
        return `<b style="font-size:35px">Tier Up #${state}</b><br>
        Reset EVERYTHING in exchange for a Tier for further progress<br>
        Need ${format(tmp.main.tierCostCalc)} Points to Tier Up`
      },
      canClick() {
        return player.points.gte(tmp.main.tierCostCalc)
      },
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
          "color": "#000000"
        }
        return {
          "background-image": "url('images/TIERCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
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

    "Factory Reset": {
      title() {
        let state = player.main.factories
        return `<b style="font-size:35px">Factory Investment #${state}</b><br>
        Reset EVERYTHING before, including Tiers in exchange for Factories that will help you progress further<br>
        Need to be at Tier ${format(tmp.main.factoryInvestmentCostCalc)} to Invest for Factories`
      },
      canClick() {
        return player.main.tier.gte(tmp.main.factoryInvestmentCostCalc)
      },
      onClick() {
        tmp.main.factoryInvestment()
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/FACTORYC.gif')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulseP 2s infinite",
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
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
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
        return hasMilestone("main", "TM8") 
      }
    },
    
    T1AT: {
    set: "auto",
    title() {
      return `<b style="font-size:25px">Stellar & Ethereum Automator</b><br>
      <b style="font-size:20px">${Boolean(player.main[this.set][this.id]) ? "On" : "Off"}</b>`
      
    },
    canClick() {
      return true
    },
    onClick() {
      player.main[this.set][this.id] = Boolean(1 - player.main[this.set][this.id])
    },
    canRun() {
      return player.main[this.set][this.id] && tmp.main.clickables[this.id].canClick
    },
    unlocked() {
      return true
    },
    style() {
      if (tmp[this.layer].clickables[this.id].canRun) return {
        "background-image": "url('images/STAT_ON.png')",
        "color": "white",
        "border": "0px",
        "border-radius": "5px",
        "width": "300px",
        "height": "auto"
      }
      return {
        "background-image": "url('images/STAT_OFF.png')",
        "color": "white",
        "border": "0px",
        "border-radius": "5px",
        "width": "300px",
        "height": "auto"
      }
    },
  },

  },
  buyables: {
    "Stellar Point Production": {
      cost(x) {
        let PowerI = new Decimal(1.7)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `${HEADERs}Neural Network v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
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
        let PowerI = new Decimal(1.4475)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM1");
      }
    },
    "Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(1.725)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:28px; text-shadow: 0px 0px 4px #000000">More Layers v${format(player[this.layer].buyables[this.id], 0)}</b>
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
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
        let PowerI = new Decimal(1.725)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM2");
      }
    },
    "Cheaper Stellar": {
      cost(x) {
        let PowerI = new Decimal(250)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `${HEADERs}Cheaper Components v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Stellar Buyable</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
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
        let PowerI = new Decimal(5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM3");
      }
    },
    "Cheaper Stellar Tier": {
      cost(x) {
        let PowerI = new Decimal(2000)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e63).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `${HEADERs} Influence v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Tier Cost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
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
        let PowerI = new Decimal(4)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },

    "Ethereum Point Production": {
      cost(x) {
        let PowerI = new Decimal(3.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Mainframe-CFAH 33 v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
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
        let PowerI = new Decimal(2.8)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM1");
      }
    },
    "Ethereum Stellar Mag Increaser": {
      cost(x) {
        let PowerI = new Decimal(8)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Defragmentation v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Stellar Magnitude Increase</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
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
        let PowerI = new Decimal(1.15)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1))).sub(1)
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM5");
      }
    },
    "Ethereum Stellar Mag Booster": {
      cost(x) {
        let PowerI = new Decimal(12)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(100000).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Mainframe Compiling v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Stellar Magnitude Boost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
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
        let PowerI = new Decimal(0.25)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM6");
      }
    },
    "Ethereum Booster": {
      cost(x) {
        let PowerI = new Decimal(24)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e12).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Booster Mark I v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Stellar & Ethereum Boost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
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
        let PowerI = new Decimal(2.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },
  },

  milestones: {
    "TM1": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 1</b>`
      },
      done() { return player.main.tier.gte(1) },
      effectDescription: `<b style="font-size:22px">
    + Unlock Stellar`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM2": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 2</b>`
      },
      done() { return player.main.tier.gte(2) },
      effectDescription: `<b style="font-size:22px">
    + Unlock 2nd Stellar buyable`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM3": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 3</b>`
      },
      done() { return player.main.tier.gte(3) },
      effectDescription: `<b style="font-size:22px">
        + Unlock 3rd Stellar buyable`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM4": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 5</b>`
      },
      done() { return player.main.tier.gte(5) },
      effectDescription: `<b style="font-size:22px">
        + Unlock Ethereum`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM5": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 7</b>`
      },
      done() { return player.main.tier.gte(7) },
      effectDescription: `<b style="font-size:22px">
        + Unlock 2nd Ethereum buyable<br>
        + Unlock Stellar Magnitude`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM6": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 9</b>`
      },
      done() { return player.main.tier.gte(9) },
      effectDescription: `<b style="font-size:22px">
            + Unlock 3rd Ethereum buyable<br>
            + 2x Stellar Magnitude limit<br>
            + Unlock Accelerant`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM7": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 11</b>`
      },
      done() { return player.main.tier.gte(11) },
      effectDescription: `<b style="font-size:22px">
            + Unlock 4th Stellar buyable<br>
            + Unlock 4th Ethereum buyable<br>
            + Power Accelerant Limit by 2 and Acceleration by 2x`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM8": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 15</b>`
      },
      done() { return player.main.tier.gte(15) },
      effectDescription: `<b style="font-size:22px">
                 + Unlock Factory Investment<br>
                 + 1.5x base Stellar Magnitude Boost<br>
                 + Power Accelerant Limit by 2 and Acceleration by 2x`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM9": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 19</b>`
      },
      done() { return player.main.tier.gte(19) },
      effectDescription: `<b style="font-size:22px">
                      + Unlock Ethereum Stabilizer ( soon )<br>
                      + 1.5x base Stellar Magnitude Boost<br>
                      + Very minor change in Factory Investment cost`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM10": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 27</b>`
      },
      done() { return player.main.tier.gte(27) },
      effectDescription: `<b style="font-size:22px">
                      + Unlock 5th Stellar buyable ( soon )<br>
                      + Unlock 5th Ethereum buyable ( soon )<br>
                      + Very minor change in Factory Investment cost<br>
                      + Power Accelerant Limit by 2 and Acceleration by 2x`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM11": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 35</b>`
      },
      done() { return player.main.tier.gte(35) },
      effectDescription: `<b style="font-size:22px">
                                     + Unlock Bitcoin ( soon )`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
  },
  tabFormat: {
    "Main Progression": {
      content: [
      ['raw-html', () => {
          return `<MA style='font-size: 24px'>You have <HI style='font-size: 30px; text-shadow: 0px 0px 20px'>${format(player.points)}</HI> Points</MA>`
                }],
      ["raw-html", () => {
          return `<MA style="font-size: 19px; color: #595959">You generate <HI style="font-size: 28px; color: #737373; text-shadow: 0px 0px 20px">${format(getPointGen())}</HI> Points / sec</MA>`
            }],
            ["raw-html", () => {
          if (player.main.tier.gte(9)) {
            return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player .main.unit)} u<sup>2</sup></HI>, which gives <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">x${format(tmp.main.AccelerantBonus)}</HI> to Points<br>
              Formula: ^ ${format(tmp.main.Accelerant)} u<sup>2</sup>/ sec</MA><br>
               <HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">Limit ${format(tmp.main.AccelerantLimit)} u<sup>2</sup></HI>`
          }
          return ``
                        }],
      "blank",
      ["microtabs", "Main", { 'border-width': '0px' }],
      ],
    },
    "Tier Tab": {
      unlocked() { return player.points.gte(10) || player.main.tier.gte(1) },
      content: [
    "blank",
    ["raw-html", () => {
          return `<MA style="font-size: 28px; color: #c7c7c7">You are at Tier <HI style="font-size: 32px; text-shadow: 0px 0px 20px">${formatNoDecimals(player.main.tier)}</HI></MA>`
    }],

    ["raw-html", () => {
          return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    "blank",
    ["row", [["clickable", "Tier Up"]]],
    "blank",
    ["row", [["clickable", "Factory Reset"]]],
    "blank",
    "milestones",
    "blank",
    ],
    },

    "Factory": {
      unlocked() { return hasMilestone("main", "TM8") },
      content: [
      ['raw-html', () => {
          return `<MA style='font-size: 24px'>You own <HI style='font-size: 30px; text-shadow: 0px 0px 20px'>${format(player.main.factories)}</HI> Factories</MA>`
                }],
      ["raw-html", () => {
          return `<MA style="font-size: 19px; color: #595959">You have produced <HI style="font-size: 28px; color: #737373; text-shadow: 0px 0px 20px">${format(player.main.oreos)}</HI> Oreos</MA>`
            }],
            ["raw-html", () => {
          if (player.main.tier.gte(0)) {
            return `<MA style="font-size: 20px; color: #595959">Your Oreos boost Points by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.OreoPointBoost)}x</HI></MA><br>
              <MA style="font-size: 20px; color: #595959">Your Oreos boost Stellar by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.OreoStellarBoost)}x </HI></MA><br>
              <MA style="font-size: 20px; color: #595959">Your Oreos boost Accelerant Limit by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">^${format(tmp.main.OreoAccelerantLimitBoost)} </HI></MA><br>
              <MA style="font-size: 20px; color: #595959">Your Oreos boost Accelerant Acceleration by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">+${format(tmp.main.OreoAccelerantBoostBonus)} </HI></MA>`
          }
          return ``
                        }],
      "blank",
      ["row", [["clickable", "T1AT"]]],
      "blank",
      ["row", [["challenge", "Looming"]]],
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
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.points)}</HI> Stellar</MA>`
        }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.resetGain)}</HI> Stellar / sec</MA>`
            }],
            "blank",
            ["raw-html", () => {
            if (player.main.tier.gte(7)) {
              return `<MA style="font-size: 20px; color: #595959">Your Stellar Magnitude is <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.StellarMagnitude)} OoMs</HI>, which gives <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">x${format(tmp.main.StellarMagnitudeBonus)}</HI> to Stellar<br>
              Formula: OoM ^ ${format(tmp.main.StellarMagBonusDisplay)}</MA><br>
               <HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">Limit ${format(player.main.limit)} OoMs</HI>`
            }
            return ``
                        }],
            "blank",
            ["row", [["buyable", "Stellar Point Production"]]],
            ["row", [["buyable", "Stellar Production"]]],
            ["row", [["buyable", "Cheaper Stellar"]]],
            ["row", [["buyable", "Cheaper Stellar Tier"]]],
          ]
      },
      "Ethereum": {
        unlocked() { return hasMilestone("main", "TM4") },
        content: [
       "blank",
       "h-line",
       "blank",
         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.eth)}</HI> Ethereum</MA>`
        }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.ethGainCalc)}</HI> Ethereum / sec</MA>`
        }],
        ["raw-html", () => {
            if (player.main.tier.lte(4.9) && player.main.oreos.gte(0.01)) {
              return `<HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">MAINFRAME_0x4929-ET ERROR: At line 153, player is under threshold. Can't generate Ethereum...</HI>`
            }
            return ``
            }],
            "blank",
            ["row", [["buyable", "Ethereum Point Production"]]],
            ["row", [["buyable", "Ethereum Stellar Mag Increaser"]]],
            ["row", [["buyable", "Ethereum Stellar Mag Booster"]]],
            ["row", [["buyable", "Ethereum Booster"]]],
          ]
      }
    }
  },
  row: 0,
  layerShown() { return true }
})