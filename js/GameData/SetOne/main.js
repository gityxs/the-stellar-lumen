const HEADERs = `<b style="font-size:28px; text-align: right">`
const HEADERe = `</b>`

const OreImage = `<img src="images/Mineral_Base.png" width="16" height="16">`

addLayer("main", {
  name: "INF^2",
  symbol: "INF^2",
  position: 0,
  startData()
  {
    return {
      unlocked: true,

      // Currencies
      points: new Decimal(0),
      eth: new Decimal(0),
      btc: new Decimal(0),
      tier: new Decimal(0),

      // Bitcoin related
      hardfork: new Decimal(0),
      hardforkxp: new Decimal(0),
      hardforklvl: new Decimal(0),

      limit: new Decimal(30),

      unit: new Decimal(1.001),
      unitLimit: new Decimal(1e10),

      factories: new Decimal(0),
      oreos: new Decimal(1),

      TCH1S: new Decimal(0),

      auto: {
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
    mult = mult.mul(buyableEffect("main", "Oreo Stellar Production"))
    mult = mult.mul(buyableEffect("main", "Bitcoin Stellar Production"))
    if (player.main.tier.gte(7)) {
      mult = mult.mul(tmp.main.StellarMagnitudeBonus)

    }
    if (player.main.TCH1S.gte(1)) {
      mult = mult.pow(tmp[this.layer].challenges["Looming"].debuff)
    }
    mult = mult.mul(tmp.main.OreoStellarBoost)
    mult = mult.mul(challengeEff("main", "Looming"))
    mult = mult.add(1)
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
    Calculation = Calculation.div(buyableEffect("main", "Cheaper Oreo Tier"))
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
    player.main.unit = new Decimal(1.01)
    player.main.tier = new Decimal(0)
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar Tier"] = new Decimal(0)
    player.main.buyables["Stellar Accelerant Boost"] = new Decimal(0)

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
    Calculation = Calculation.sub(buyableEffect("main", "Ethereum Cheaper Factory"))
    return Calculation
  },

  hardfork() {
    player.main.hardfork = player.main.hardfork.add(1)
    
    player.points = new Decimal(0)
    player.main.tier = new Decimal(0)
    player.main.factories = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)
    player.main.unit = new Decimal(1.0)
    player.main.oreos = new Decimal(0)
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar Tier"] = new Decimal(0)
    player.main.buyables["Stellar Accelerant Boost"] = new Decimal(0)

    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Increaser"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Booster"] = new Decimal(0)
    player.main.buyables["Ethereum Booster"] = new Decimal(0)
    player.main.buyables["Ethereum Cheaper Factory"] = new Decimal(0)

    player.main.buyables["Oreo Point Production"] = new Decimal(0)
    player.main.buyables["Oreo Stellar Production"] = new Decimal(0)
    player.main.buyables["Oreo Cheaper"] = new Decimal(0)
    player.main.buyables["Cheaper Oreo Tier"] = new Decimal(0)
    player.main.buyables["Oreo Looming Offsetter"] = new Decimal(0)
    player.main.buyables["Oreo Bonus Booster"] = new Decimal(0)
  },

  hardforkCostCalc() {
    let Base = new Decimal("1e1200")

    let Power = player.main.hardfork
    Power = Power.add(1)

    let CalculationI = new Decimal.pow(Power, 0.1)
    let CalculationII = new Decimal.pow(Base, CalculationI)
    return CalculationII
  },

  hardforkXPCalc() {
    let Base = player.main.hardfork
    let Power = new Decimal(2)

    let Calculation = new Decimal.pow(Base, Power)
    return Calculation
  },

  hardforkXPlevelCalc() {
    let Base = new Decimal(10)
    let Level = player.main.hardforklvl

    let CalculationI = new Decimal.pow(Level, 5)
    let CalculationII = new Decimal.mul(Base, CalculationI)

    return CalculationII
  },
  
  bitcoinGeneration() {
    let Base = player.main.hardforklvl
    let Power = new Decimal(2.5)
    
    let Calculation = new Decimal.pow(Power, Base).sub(1)
    
    return Calculation
  },

  ethGainCalc() {
    let Stellar = player.main.points
    Stellar = Stellar.add(1)
    let Generation = new Decimal.pow(Stellar, 0.25)
    Generation = Generation.add(1)

    Generation = Generation.mul(buyableEffect("main", "Ethereum Booster"))

    if (player.main.tier.gte(19)) {
      Generation = Generation.mul(tmp.main.EthereumStabilizerBoost)
    }
    Generation = Generation.add(1)
    return Generation
  },

  oreoGainCalc() {
    let Factory = player.main.factories
    Factory = Factory.add(1)

    let Production = new Decimal.pow(3, Factory).sub(1)
    Production = Production.add(1)
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
    Power = Power.add(buyableEffect("main", "Bitcoin Stellar Mag Booster"))
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
    Power = Power.add(buyableEffect("main", "Bitcoin Stellar Mag Booster"))

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

  EthereumStabilizer() {
    let Base = new Decimal(0)

    Base = Base.add(player.main.buyables["Ethereum Point Production"])
    Base = Base.add(player.main.buyables["Ethereum Stellar Mag Increaser"])
    Base = Base.add(player.main.buyables["Ethereum Stellar Mag Booster"])
    Base = Base.add(player.main.buyables["Ethereum Booster"])
    Base = Base.add(player.main.buyables["Ethereum Cheaper Factory"])
    return Base
  },

  EthereumStabilizerBoost() {
    let Base = new Decimal(1.2)

    let Calculation = new Decimal.pow(Base, tmp.main.EthereumStabilizer)

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
    Limit = Limit.pow(buyableEffect("main", "Bitcoin Accelerant Limit"))
    Limit = Limit.add(1)
    return Limit
  },

  AccelerantSpeed() {
    let Acceleration = new Decimal(1.02)

    if (hasMilestone("main", "TM8"))
      Acceleration = Acceleration.add(tmp.main.OreoAccelerantBoostBonus)
    if (hasMilestone("main", "TM7")) {
      Acceleration = Acceleration.add(0.02)
    }
    if (hasMilestone("main", "TM8")) {
      Acceleration = Acceleration.add(0.04)
    }
    if (hasMilestone("main", "TM10")) {
      Acceleration = Acceleration.add(0.08)
    }
    Acceleration = Acceleration.mul(buyableEffect("main", "Bitcoin Accelerant Speed"))

    return Acceleration
  },

  AccelerantBonus() {
    let Base = new Decimal(1)
    Base = Base.add(buyableEffect("main", "Stellar Accelerant Bonus"))
    Base = Base.add(buyableEffect("main", "Bitcoin Accelerant Bonus"))
    let Calculation = new Decimal.pow(player.main.unit, Base)
    
    Calculation = Calculation.add(1)

    return Calculation
  },

  AccelerantBonusDisplay() {
    let Base = new Decimal(1)
    Base = Base.add(buyableEffect("main", "Stellar Accelerant Bonus"))
    Base = Base.add(buyableEffect("main", "Bitcoin Accelerant Bonus"))
    return Base
  },

  OreoPointBoost() {
    let Oreo = player.main.oreos
    let Calculation = new Decimal.pow(Oreo, 7)
    
    Calculation = Calculation.pow(buyableEffect("main", "Oreo Bonus Booster"))
    Calculation = Calculation.add(1)
    return Calculation
  },

  OreoStellarBoost() {
    let Oreo = player.main.oreos
    Oreo = Oreo.add(1)
    let Calculation = new Decimal.pow(Oreo, 6)
    
    Calculation = Calculation.pow(buyableEffect("main", "Oreo Bonus Booster"))
    Calculation = Calculation.add(1)
    return Calculation
  },

  OreoAccelerantLimitBoost() {
    let Oreo = player.main.oreos
    Oreo = Oreo.add(1)
    let Calculation = new Decimal.pow(Oreo, 0.05)
    
    Calculation = Calculation.pow(buyableEffect("main", "Oreo Bonus Booster"))
    Calculation = Calculation.add(1)
    return Calculation
  },

  OreoAccelerantBoostBonus() {
    let Oreo = player.main.oreos
    Oreo = Oreo.add(1)
    let Logarithm = new Decimal(10)

    let CalculationI = new Decimal.log(Oreo, Logarithm)
    CalculationI = CalculationI.add(1)
    CalculationI = CalculationI.pow(buyableEffect("main", "Oreo Bonus Booster"))
    let CalculationII = new Decimal.div(CalculationI, 50)

    return CalculationII
  },


  update(diff) {
    if (player.main.factories.gte(1)) {
      player.main.oreos = player.main.oreos.add((tmp.main.oreoGainCalc).times(diff))
    }
    
      player.main.eth = player.main.eth.add((tmp.main.ethGainCalc).times(diff))
    
    if (player.main.tier.gte(9)) {
      player.main.unit = player.main.unit.times(tmp.main.AccelerantSpeed.pow(diff))
    
      if (player.main.unit.gte(tmp.main.AccelerantLimit)) {
        return player.main.unit = tmp.main.AccelerantLimit
      }
    }
    player.main.unitLimit = tmp.main.AccelerantLimit
    player.main.limit = tmp.main.StellarMagnitudeLimit

    player.main.hardforkxp = player.main.hardforkxp.add((tmp.main.hardforkXPCalc).times(diff))
    
    player.main.btc = player.main.btc.add((tmp.main.bitcoinGeneration).times(diff))
    if (player.main.hardforkxp.gte(tmp.main.hardforkXPlevelCalc)) {
      player.main.hardforklvl = player.main.hardforklvl.add(1)
      player.main.hardforkxp = new Decimal(0)
    }

    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Stellar Point Production")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Stellar Production")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Cheaper Stellar")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Cheaper Stellar Tier")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Stellar Accelerant Bonus")

    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Ethereum Point Production")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Ethereum Stellar Mag Increaser")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Ethereum Stellar Mag Booster")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Ethereum Booster")
    if (tmp.main.clickables.T1AT.canRun) buyBuyable(this.layer, "Ethereum Cheaper Factory")

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
        var bonusComp = buyableEffect("main", "Oreo Looming Offsetter")
        return `
            <b style="font-size:22px; text-shadow: 0px 0px 20px #ffffff">- ★ -</b>
            <br>
            <b style="font-size:45px; text-shadow: 0px 0px 10px #000000">Looming</b><br>
            <br> <br>
            <b style="font-size:17px; text-shadow: 0px 0px 10px #000000">Produce <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">^${format(AC.debuff)} Stellar</b> when in this challenge<br>
            <br>
            You need <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.goal)} Stellar</b> to finish this challenge once<br>
            ${format(challengeCompletions(this.layer, this.id))} + ${format(bonusComp)} / ${format(this.completionLimit)} completions<br>
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

        x = x.add(buyableEffect("main", "Oreo Looming Offsetter"))

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

    "Hardfork": {
      title() {
        let state = player.main.hardfork
        return `<b style="font-size:35px">Hardfork #${state}</b><br>
        Reset EVERYTHING before, including Tiers , Factories in exchange for Hardfork that will help you progress beyond further than previous layers did<br>
        You need ${format(tmp.main.hardforkCostCalc)} Points to Hardfork`
      },
      canClick() {
        return player.points.gte(tmp.main.hardforkCostCalc)
      },
      onClick() {
        tmp.main.hardfork()
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/HardforkC.png')",
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
          "background-image": "url('images/HardforkCT.png')",
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
        return hasMilestone("main", "TM6")
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
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Stellar"))
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
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Stellar"))
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
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Stellar"))
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
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Stellar"))
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
    "Stellar Accelerant Bonus": {
      cost(x) {
        let PowerI = new Decimal(1e10)
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
        let Calculation = new Decimal("1e333").mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `${HEADERs} Better Computing v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Accelerant Falloff</b><br>
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
        let PowerI = new Decimal(0.02)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM10");
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
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
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
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
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
        let PowerI = new Decimal(7.5)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
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
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
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
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
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
    "Ethereum Cheaper Factory": {
      cost(x) {
        let PowerI = new Decimal(1e15)
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
        let Calculation = new Decimal(1e100).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        return Calculation;
      },
      display() {
        return `${HEADERs}Investors v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">-${format(tmp[this.layer].buyables[this.id].effect)} Factory Investment Requirement</b><br>
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
        let PowerI = new Decimal(0.5)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM10");
      }
    },

    "Oreo Point Production": {
      cost(x) {
        let PowerI = new Decimal(1.5)
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
        return `${HEADERs}C-Neural Network v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(5.66)
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
        return true
      }
    },
    "Oreo Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(1.5)
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
        return `${HEADERs}More Computers v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(10)
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
        return true
      }
    },
    "Oreo Cheaper": {
      cost(x) {
        let PowerI = new Decimal(3)
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
        return `${HEADERs}Mass Part Manufacturing v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Ethereum & Stellar Buyables</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(1000)
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
        return true
      }
    },
    "Cheaper Oreo Tier": {
      cost(x) {
        let PowerI = new Decimal(5)
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
        let Calculation = new Decimal(10000).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Advertising v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Tier Cost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(1000)
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
        return true
      }
    },
    "Oreo Looming Offsetter": {
      cost(x) {
        let PowerI = new Decimal(50)
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
        let Calculation = new Decimal(1e5).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Special Upgrade-I v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Looming Completions</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(1)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Oreo Bonus Booster": {
      cost(x) {
        let PowerI = new Decimal(2)
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
        let Calculation = new Decimal(1e6).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Special Upgrade-II v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">^${format(tmp[this.layer].buyables[this.id].effect)} Oreo Bonuses</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(1.1)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.sqrt(PowerII)
        PowerI = PowerI.sqrt(PowerIII)
        PowerI = PowerI.sqrt(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    
    
    "Bitcoin Point Production": {
      cost(x) {
        let PowerI = new Decimal(2)
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
        return `${HEADERs}Consise Thinking v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1e4)
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
        return true
      }
    },
    "Bitcoin Accelerant Limit": {
      cost(x) {
        let PowerI = new Decimal(2.5)
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
        let Calculation = new Decimal(50).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}SSD Drive Capacity v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">^${format(tmp[this.layer].buyables[this.id].effect)} Accelerant Limit</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1.025)
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
        return true
      }
    },
    "Bitcoin Accelerant Speed": {
      cost(x) {
        let PowerI = new Decimal(3)
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
        let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Clocking Speed v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
            <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Accelerant Speed</b><br>
        <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1.044)
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
        return true
      }
    },
    "Bitcoin Accelerant Bonus": {
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
        let Calculation = new Decimal(250).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Precise Computing v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
            <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Accelerant Falloff</b><br>
        <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(0.05)
        
        PowerI = PowerI.mul(x)
        
        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    
    "Bitcoin Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(2)
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
        return `${HEADERs}Nano-Processing v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1e5)
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
        return true
      }
    },
    "Bitcoin Stellar Mag Booster": {
      cost(x) {
        let PowerI = new Decimal(3)
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
        let Calculation = new Decimal(175).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Smarter Artificial Intelligence v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Stellar  Magnitude Boost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(2.025)
        
        PowerI = PowerI.mul(x)
        
        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Bitcoin Cheaper Stellar": {
      cost(x) {
        let PowerI = new Decimal(4)
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
        let Calculation = new Decimal(675).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Part Duplication v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Stellar Buyables</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1e6)
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
        return true
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
          "background-image": "url('images/BronzeMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
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
          "background-image": "url('images/BronzeMastery.png')",
          "background-size": "50% !important",
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
          "background-image": "url('images/BronzeMastery.png')",
          "background-size": "50% !important",
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
          "background-image": "url('images/SilverMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
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
          "background-image": "url('images/SilverMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
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
          "background-image": "url('images/SilverMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
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
          "background-image": "url('images/GoldMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
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
          "background-image": "url('images/GoldMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      }
    },
    "TM9": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 19</b>`
      },
      done() { return player.main.tier.gte(19) },
      effectDescription: `<b style="font-size:22px">
                      + Unlock Ethereum Stabilizer<br>
                      + 1.5x base Stellar Magnitude Boost<br>
                      + Very minor change in Factory Investment cost`,
      style() {
        return {
          "background-image": "url('images/GoldMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      }
    },
    "TM10": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 27</b>`
      },
      done() { return player.main.tier.gte(27) },
      effectDescription: `<b style="font-size:22px">
                      + Unlock 5th Stellar buyable<br>
                      + Unlock 5th Ethereum buyable<br>
                      + Very minor change in Factory Investment cost<br>
                      + Power Accelerant Limit by 2 and Acceleration by 2x`,
      style() {
        return {
          "background-image": "url('images/DiamondMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      }
    },
    "TM11": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 35</b>`
      },
      done() { return player.main.tier.gte(35) },
      effectDescription: `<b style="font-size:22px">
                                     + Unlock Bitcoin`,
      style() {
        return {
          "background-image": "url('images/DiamondMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      }
    },
    "TM12": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 43</b>`
      },
      done() { return player.main.tier.gte(43) },
      effectDescription: `<b style="font-size:22px">
                                         + Unlock 3rd Bitcoin Tab`,
      style() {
        return {
          "background-image": "url('images/DiamondMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      }
    },
    "TM13": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 59</b>`
      },
      done() { return player.main.tier.gte(59) },
      effectDescription: `<b style="font-size:22px">
                                         + Unlock 4th Bitcoin Tab`,
      style() {
        return {
          "background-image": "url('images/AmethystMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      }
    },
    "TM14": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 75</b>`
      },
      done() { return player.main.tier.gte(75) },
      effectDescription: `<b style="font-size:22px">
                                         + Unlock The Machinery ( soon )<br>
                                         + Unlock Crafting System ( soon )`,
      style() {
        return {
          "background-image": "url('images/AmethystMastery.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      }
    },
  },
  tabFormat: {
    "Main Progression": {
      content: [
      "h-line",
      "blank",
      ['raw-html', () => {
          return `<MA style='font-size: 24px'>You have <HI style='font-size: 30px; text-shadow: 0px 0px 20px'>${format(player.points)}</HI> Points</MA>`
                }],
      ["raw-html", () => {
          return `<MA style="font-size: 19px; color: #595959">You generate <HI style="font-size: 28px; color: #737373; text-shadow: 0px 0px 20px">${format(getPointGen())}</HI> Points / sec</MA>`
            }],
            "blank",
            ["raw-html", () => {
          if (player.main.tier.gte(9)) {
            return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.main.unit)} u<sup>2</sup></HI>, which gives <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">x${format(tmp.main.AccelerantBonus)}</HI> to Points<br>
              Generation Rate: × ${format(tmp.main.AccelerantSpeed)} u<sup>2</sup>/ sec<br>
              Boost Formula: ( u<sup>2</sup> ^ ${format(tmp.main.AccelerantBonusDisplay)} ) + 1</MA><br>
               <HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">Limit ${format(tmp.main.AccelerantLimit)} u<sup>2</sup></HI>`
          }
          return ``
                        }],
      "blank",
      ["microtabs", "Main", { 'border-width': '0px' }],
      ],
    },
    "Progression": {
      unlocked() { return player.points.gte(10) || player.main.tier.gte(1) },
      content: [
    "blank",
    ["microtabs", "Progression", { 'border-width': '0px' }],
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
            return `<MA style="font-size: 20px; color: #595959">Your Oreos boost Points by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.OreoPointBoost)}x</HI></MA><br>
              <MA style="font-size: 20px; color: #595959">Your Oreos boost Stellar by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.OreoStellarBoost)}x </HI></MA><br>
              <MA style="font-size: 20px; color: #595959">Your Oreos boost Accelerant Limit by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">^${format(tmp.main.OreoAccelerantLimitBoost)} </HI></MA><br>
              <MA style="font-size: 20px; color: #595959">Your Oreos boost Accelerant Acceleration by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">+${format(tmp.main.OreoAccelerantBoostBonus)} </HI></MA>`
                        }],
      "blank",
      ["row", [["challenge", "Looming"]]],
      "blank",
      ["row", [["buyable", "Oreo Point Production"]]],
      ["row", [["buyable", "Oreo Stellar Production"]]],
      ["row", [["buyable", "Oreo Cheaper"]]],
      ["row", [["buyable", "Cheaper Oreo Tier"]]],
      ["row", [["buyable", "Oreo Looming Offsetter"]]],
      ["row", [["buyable", "Oreo Bonus Booster"]]],
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
            ["row", [["clickable", "T1AT"]]],
            "blank",
            "blank",
            ["row", [["buyable", "Stellar Point Production"]]],
            ["row", [["buyable", "Stellar Production"]]],
            ["row", [["buyable", "Cheaper Stellar"]]],
            ["row", [["buyable", "Cheaper Stellar Tier"]]],
            ["row", [["buyable", "Stellar Accelerant Bonus"]]],
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
            if (player.main.tier.gte(19)) {
              return `<MA style="font-size: 20px; color: #595959">Your have bought <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.EthereumStabilizer)} ETH</HI>, buyables which in return you are compensated with <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">x${format(tmp.main.EthereumStabilizerBoost)}</HI> to Ethereum<br>
              Formula: OoM ^ ${format(tmp.main.StellarMagBonusDisplay)}</MA><br>
               <HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">Limit ${format(player.main.limit)} OoMs</HI>`
            }
            return ``
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
            ["row", [["buyable", "Ethereum Cheaper Factory"]]]
          ]
      },

      "Bitcoin": {
        unlocked() { return hasMilestone("main", "TM11") },
        content: [
       "blank",
       "h-line",
       "blank",
       ["raw-html", () => {
            return `<MA style='font-size: 25px'>You have done <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${formatNoDecimals(player.main.hardfork)}</HI> Hardforks</MA>`
               }],
         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.btc)}</HI> Bitcoin</MA>`
        }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You fork <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.bitcoinGeneration)}</HI> Bitcoin / sec</MA>`
                        }],
        "blank",
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You Hardforks generate <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.hardforkXPCalc)} XP</HI> sec</MA>`
                }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.main.hardforkxp)}</HI> XP</MA>`
                                }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You need <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.hardforkXPlevelCalc)} XP</HI> to reach next Level</MA>`
                }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You are at Level <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.main.hardforklvl)}</HI></MA>`
                                }],

            "blank",
            ["row", [["clickable", "Hardfork"]]],
            "blank",
            "blank",
            "h-line",
            "blank",
            ["microtabs", "BitcoinBuyables", { 'border-width': '0px' }],
          ]
      }
    },

    Progression: {
      "Tier": {
        content: [
             "blank",
             "h-line",
             "blank",
          ['raw-html', () => {
            return `<MA style='font-size: 24px'>You are at Tier <HI style='font-size: 30px; text-shadow: 0px 0px 20px'>${formatNoDecimals(player.main.tier)}</HI></MA>`
                }],
         ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    "blank",
    ["row", [["clickable", "Tier Up"]]],
    "blank",
    "blank",
    ["raw-html", () => {
            return `<MA style="font-size: 24px; color: #ffffff">Tier Milestones</MA>`
        }],
        ["row", [["milestone", "TM1"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM2"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM3"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM4"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM5"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM6"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM7"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM8"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM9"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM10"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM11"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM12"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM13"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM14"]]],
    ],
      },

      "Factory": {
        content: [
                   "blank",
                   "h-line",
                   "blank",
                ['raw-html', () => {
            return `<MA style='font-size: 24px'>You own <HI style='font-size: 30px; text-shadow: 0px 0px 20px'>${formatNoDecimals(player.main.factories)}</HI> Factories</MA>`
                      }],
               ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You are at Tier <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.main.tier)}</HI> </MA>`
          }],
               ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
          }],
          "blank",
           ["row", [["clickable", "Factory Reset"]]],
          ],
      }
    },

    BitcoinBuyables: {
      "Point Buyables": {
        content: [
                         "blank",
                         "h-line",
                         "blank",
                         ["row", [["buyable", "Bitcoin Point Production"]]],
                         ["row", [["buyable", "Bitcoin Accelerant Limit"]]],
                         ["row", [["buyable", "Bitcoin Accelerant Speed"]]],
                         ["row", [["buyable", "Bitcoin Accelerant Bonus"]]],
                ],
      },
      "Stellar Buyables": {
        content: [
                   "blank",
                   "h-line",
                   "blank",
                   ["row", [["buyable", "Bitcoin Stellar Production"]]],
                   ["row", [["buyable", "Bitcoin Stellar Mag Booster"]]],
                   ["row", [["buyable", "Bitcoin Cheaper Stellar"]]],
          ],
      },
      "Ethereum Buyables": {
        content: [
                   "blank",
                   "h-line",
                   "blank",
          ],
      },
      "Progression Buyables": {
        content: [
                         "blank",
                         "h-line",
                         "blank",
                ],
      },
    }
  },
  row: 0,
  layerShown() { return true }
})