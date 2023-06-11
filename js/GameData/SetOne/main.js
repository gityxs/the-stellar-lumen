addLayer("main", {
  name: "INF^2",
  symbol: "INF^2",
  position: 0,
  startData()
  {
    return {
      unlocked: true,
      points: new Decimal(0),
      tier: new Decimal(0)
    }
  },
  color: "#ffffff",
  requires: new Decimal(10),
  resource: "Stellar",
  baseResource: "points",
  baseAmount() { return player.points },
  type: "normal",
  exponent: 0.0000005,
  gainMult()
  {
    mult = new Decimal(1)
    mult = mult.mul(buyableEffect("main", "Stellar Production"))
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
    let Base = new Decimal(10)
    let Tier = player.main.tier
    let Layer = new Decimal(2)
    
    let ScaleI = new Decimal.pow(10, Tier)
    let CostI = new Decimal.mul(ScaleI, Tier)
    
    let ScaleII = new Decimal.pow(10, Tier)
    let CostII = new Decimal.mul(ScaleII, Tier)
    
    let Calculation = new Decimal.mul(CostI, CostII)
    return Calculation
  },
  tierUp() {
    player.main.tier = player.main.tier.add(1)
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
      return true //return player.points.gte(tmp.main.tierCostCalc)
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
        return Calculation;
      },
      display() {
      return `<b style="font-size:28px; text-shadow: 0px 0px 4px #000000">Neural Network v${format(player[this.layer].buyables[this.id], 0)}</b>
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
        return true;
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
      "blank",
            ['raw-html', () => {
          return `<MA style='font-size: 24px'>You have <HI style='font-size: 30px; text-shadow: 0px 0px 20px'>${format(player.main.points)}</HI> Stellar</MA>`
                }],
      ["raw-html", () => {
          return `<MA style="font-size: 19px; color: #595959">You generate <HI style="font-size: 28px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.resetGain)}</HI> Stellar / sec</MA>`
            }],
      "blank",
      "blank",
      "h-line",
      "blank",
      "blank",
       ["row", [["buyable", "Stellar Production"]]],
      ]
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
    ],
  },
  },
  row: 0,
  layerShown() { return true }
})