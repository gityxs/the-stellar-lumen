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
    if (player.main.tier.gte(7)) {
    mult = mult.mul(tmp.main.StellarMagnitudeBonus)
    }
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
    let Base = new Decimal(75)
    let Tier = player.main.tier
    let Layer = new Decimal(1.5)

    let ScaleI = new Decimal.pow(10, Tier)
    let CostI = new Decimal.mul(ScaleI, Tier)

    let ScaleII = new Decimal.pow(10, Tier)
    let CostII = new Decimal.mul(ScaleII, Tier)

    let Calculation = new Decimal.mul(CostI, CostII)
    Calculation = Calculation.pow(Layer)
    return Calculation
  },
  tierUp() {
    player.main.tier = player.main.tier.add(1)
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)

    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)
    
    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Increaser"] = new Decimal(0)
  },
  ethGainCalc() {
    let Stellar = player.main.points
    Stellar = Stellar.add(1)
    let Generation = new Decimal.log(Stellar, 5) 
    Generation = Generation.add(1)
    return Generation
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
    let CalculationI = tmp.main.StellarMagnitude
    let CalculationII = new Decimal.pow(CalculationI, 2)
    CalculationII = CalculationII.add(1)
    return CalculationII
  },
  
  StellarMagnitudeLimit() {
    let Limit = new Decimal(30)
    Limit = Limit.add(buyableEffect("main", "Ethereum Stellar Mag Increaser"))
    
    if(hasMilestone("main", "TM6")) {
      Limit = Limit.mul(2)
    }
    
    return Limit
  },
  
  update(diff) {
    if (player.main.points.gte(1)) {
    player.main.eth = player.main.eth.add((tmp.main.ethGainCalc).times(diff))
    }
    
    player.main.limit = tmp.main.StellarMagnitudeLimit
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
  },
  buyables: {
    "Stellar Point Production": {
      cost(x) {
        let PowerI = new Decimal(1.75)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

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
        let PowerI = new Decimal(1.4)
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
        let PowerI = new Decimal(1.75)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

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
        let PowerI = new Decimal(1.7)
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
        let PowerI = new Decimal(200)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

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
    
    "Ethereum Point Production": {
      cost(x) {
        let PowerI = new Decimal(3.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

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
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

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
        let PowerI = new Decimal(1.5)
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
            + 2x Stellar Magnitude limit`,
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
    "milestones",
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
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.points)}</HI> Stellar</MA>`
        }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.resetGain)}</HI> Stellar / sec</MA>`
            }],
            "blank",
            ["raw-html", () => {
              if (player.main.tier.gte(7)) {
              return `<MA style="font-size: 20px; color: #595959">Your Stellar Magnitude is <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.StellarMagnitude)} OoMs</HI>, which gives <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">x${format(tmp.main.StellarMagnitudeBonus)}</HI> to Stellar<br>
              Formula: OoM ^ 2</MA><br>
               <HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">Limit ${format(player.main.limit)} OoMs</HI>`
              }
              return ``
                        }],
            "blank",
            ["row", [["buyable", "Stellar Point Production"]]],
            ["row", [["buyable", "Stellar Production"]]],
            ["row", [["buyable", "Cheaper Stellar"]]],
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
            ["row", [["buyable", "Ethereum Point Production"]]],
            ["row", [["buyable", "Ethereum Stellar Mag Increaser"]]],
          ]
      }
    }
  },
  row: 0,
  layerShown() { return true }
})