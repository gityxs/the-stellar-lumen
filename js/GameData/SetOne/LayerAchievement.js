addLayer("ach", {
    name: "INF-A", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "INF-A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    row: "side",
    
    achievementNotif() {
      return `Achievement Finished` // little tamper in utils.js at line 276 :troll:
    },
    achievements: {
        "TS1": {
            name: "Total Stellar I",
            done() { return player.main.points.gt(1) },
            tooltip: "Get your first Stellar!",
        },
        "TS2": {
            name: "Total Stellar II",
            done() { return player.main.points.gt(100) },
            tooltip: "Get 100 Stellar!",
        },
        "TS3": {
          name: "Total Stellar III",
          done() { return player.main.points.gt(1e6) },
          tooltip: "Get 1,000,000 Stellar!",
        },
        "TS4": {
          name: "Total Stellar IV",
          done() { return player.main.points.gt(1e9) },
          tooltip: "Get 1,000,000,000 Stellar!",
        },
        
        "TS5": {
          name: "Total Stellar V",
          done() { return player.main.points.gt(1e12) },
          tooltip: "Get 1,000,000,000,000 Stellar!",
        },
        "TS6": {
          name: "Total Stellar VI",
          done() { return player.main.points.gt(1e15) },
          tooltip: "Get 1,000,000,000,000,000 Stellar!",
        },
        "TS7": {
          name: "Total Stellar VII",
          done() { return player.main.points.gt(1e18) },
          tooltip: "Get 1 × 10^18 Stellar!",
        },
        "TS8": {
          name: "Total Stellar VIII",
          done() { return player.main.points.gt(1e21) },
          tooltip: "Get 1 × 10^21 Stellar!",
        },
        
        
        "TS9": {
          name: "Total Stellar IX",
          done() { return player.main.points.gt(1e27) },
          tooltip: "Get 1 × 10^27 Stellar!",
        },
        "TS10": {
          name: "Total Stellar X",
          done() { return player.main.points.gt(1e33) },
          tooltip: "Get 1 × 10^33 Stellar!",
        },
        "TS11": {
          name: "Total Stellar XI",
          done() { return player.main.points.gt(1e39) },
          tooltip: "Get 1 × 10^39 Stellar!",
        },
        "TS12": {
          name: "Total Stellar XII",
          done() { return player.main.points.gt(1e45) },
          tooltip: "Get 1 × 10^45 Stellar!",
        },
        
        "TS13": {
          name: "Total Stellar XIII",
          done() { return player.main.points.gt(1e51) },
          tooltip: "Get 1 × 10^51 Stellar!",
        },
        "TS14": {
          name: "Total Stellar XIV",
          done() { return player.main.points.gt(1e57) },
          tooltip: "Get 1 × 10^57 Stellar!",
        },
        "TS15": {
          name: "Total Stellar XV",
          done() { return player.main.points.gt(1e63) },
          tooltip: "Get 1 × 10^63 Stellar!",
        },
        "TS16": {
          name: "Total Stellar XVI",
          done() { return player.main.points.gt(1e69) },
          tooltip: "Get 1 × 10^69 Stellar!",
        },
        
        
        "TS17": {
          name: "Total Stellar XVII",
          done() { return player.main.points.gt(1e81) },
          tooltip: "Get 1 × 10^81 Stellar!",
        },
        "TS18": {
          name: "Total Stellar XVIII",
          done() { return player.main.points.gt(1e93) },
          tooltip: "Get 1 × 10^93 Stellar!",
        },
        "TS19": {
          name: "Total Stellar XIX",
          done() { return player.main.points.gt(1e105) },
          tooltip: "Get 1 × 10^105 Stellar!",
        },
        "TS20": {
          name: "Total Stellar XX",
          done() { return player.main.points.gt(1e117) },
          tooltip: "Get 1 × 10^117 Stellar!",
        },
        
        "TS21": {
          name: "Total Stellar XXI",
          done() { return player.main.points.gt(1e129) },
          tooltip: "Get 1 × 10^129 Stellar!",
        },
        "TS22": {
          name: "Total Stellar XXII",
          done() { return player.main.points.gt(1e141) },
          tooltip: "Get 1 × 10^141 Stellar!",
        },
        "TS23": {
          name: "Total Stellar XXIII",
          done() { return player.main.points.gt(1e153) },
          tooltip: "Get 1 × 10^153 Stellar!",
        },
        "TS24": {
          name: "Total Stellar XXIV",
          done() { return player.main.points.gt(1e165) },
          tooltip: "Get 1 × 10^165 Stellar!",
        },
        
        
        "TS25": {
          name: "Total Stellar XXV",
          done() { return player.main.points.gt(1e189) },
          tooltip: "Get 1 × 10^189 Stellar!",
        },
        "TS26": {
          name: "Total Stellar XXVI",
          done() { return player.main.points.gt(1e213) },
          tooltip: "Get 1 × 10^213 Stellar!",
        },
        "TS27": {
          name: "Total Stellar XXVII",
          done() { return player.main.points.gt(1e237) },
          tooltip: "Get 1 × 10^237 Stellar!",
        },
        "TS28": {
          name: "Total Stellar XXVII",
          done() { return player.main.points.gt(1e261) },
          tooltip: "Get 1 × 10^261 Stellar!",
        },
        
        "TS29": {
          name: "Total Stellar XXIX",
          done() { return player.main.points.gt(1e285) },
          tooltip: "Get 1 × 10^285 Stellar!",
        },
        "TS30": {
          name: "Total Stellar XXX",
          done() { return player.main.points.gt(1e309) },
          tooltip: "Get 1 × 10^309 Stellar!",
        },
        "TS31": {
          name: "Total Stellar XXXI",
          done() { return player.main.points.gt(1e333) },
          tooltip: "Get 1 × 10^333 Stellar!",
        },
        "TS32": {
          name: "Total Stellar XXXII",
          done() { return player.main.points.gt(1e357) },
          tooltip: "Get 1 × 10^357 Stellar!",
        },
        
        
        
        "TE1": {
            name: "Total Ethereum I",
            done() { return player.main.eth.gt(1) },
            tooltip: "Manufacture your first Ethereum!",
        },
        "TE2": {
            name: "Total Ethereum II",
            done() { return player.main.eth.gt(10) },
            tooltip: "Manufacture 10 Ethereum!",
        },
        "TE3": {
          name: "Total Ethereum III",
          done() { return player.main.eth.gt(1000) },
          tooltip: "Manufacture 1,000 Ethereum!",
        },
        "TE4": {
          name: "Total Ethereum IV",
          done() { return player.main.eth.gt(1e5) },
          tooltip: "Manufacture 100,000 Ethereum!",
        },
        
        "TE5": {
          name: "Total Ethereum V",
          done() { return player.main.eth.gt(1e7) },
          tooltip: "Manufacture 10,000,000 Ethereum!",
        },
        "TE6": {
          name: "Total Ethereum VI",
          done() { return player.main.eth.gt(1e9) },
          tooltip: "Manufacture 1,000,000,000 Ethereum!",
        },
        "TE7": {
          name: "Total Ethereum VII",
          done() { return player.main.eth.gt(1e11) },
          tooltip: "Manufacture 100,000,000,000 Ethereum!",
        },
        "TE8": {
          name: "Total Ethereum VIII",
          done() { return player.main.eth.gt(1e13) },
          tooltip: "Manufacture 10,000,000,000,000 Ethereum!",
        },
        
        
        "TE9": {
          name: "Total Ethereum IX",
          done() { return player.main.eth.gt(1e17) },
          tooltip: "Manufacture 100,000,000,000,000,000 Ethereum!",
        },
        "TE10": {
          name: "Total Ethereum X",
          done() { return player.main.eth.gt(1e21) },
          tooltip: "Manufacture 1 × 10^21 Ethereum!",
        },
        "TE11": {
          name: "Total Ethereum XI",
          done() { return player.main.eth.gt(1e25) },
          tooltip: "Manufacture 1 × 10^25 Ethereum!",
        },
        "TE12": {
          name: "Total Ethereum XII",
          done() { return player.main.eth.gt(1e29) },
          tooltip: "Manufacture 1 × 10^29 Ethereum!",
        },
        
        "TE13": {
          name: "Total Ethereum XIII",
          done() { return player.main.eth.gt(1e33) },
          tooltip: "Manufacture 1 × 10^33 Ethereum!",
        },
        "TE14": {
          name: "Total Ethereum XIV",
          done() { return player.main.eth.gt(1e37) },
          tooltip: "Manufacture 1 × 10^37 Ethereum!",
        },
        "TE15": {
          name: "Total Ethereum XV",
          done() { return player.main.eth.gt(1e41) },
          tooltip: "Manufacture 1 × 10^41 Ethereum!",
        },
        "TE16": {
          name: "Total Ethereum XVI",
          done() { return player.main.eth.gt(1e45) },
          tooltip: "Manufacture 1 × 10^45 Ethereum!",
        },
        
        
        "TE17": {
          name: "Total Ethereum XVII",
          done() { return player.main.eth.gt(1e53) },
          tooltip: "Manufacture 1 × 10^53 Ethereum!",
        },
        "TE18": {
          name: "Total Ethereum XVIII",
          done() { return player.main.eth.gt(1e61) },
          tooltip: "Manufacture 1 × 10^61 Ethereum!",
        },
        "TE19": {
          name: "Total Ethereum XIX",
          done() { return player.main.eth.gt(1e69) },
          tooltip: "Manufacture 1 × 10^69 Ethereum!",
        },
        "TE20": {
          name: "Total Ethereum XX",
          done() { return player.main.eth.gt(1e77) },
          tooltip: "Manufacture 1 × 10^77 Ethereum!",
        },
        
        "TE21": {
          name: "Total Ethereum XXI",
          done() { return player.main.eth.gt(1e85) },
          tooltip: "Manufacture 1 × 10^85 Ethereum!",
        },
        "TE22": {
          name: "Total Ethereum XXII",
          done() { return player.main.eth.gt(1e93) },
          tooltip: "Manufacture 1 × 10^93 Ethereum!",
        },
        "TE23": {
          name: "Total Ethereum XXIII",
          done() { return player.main.eth.gt(1e101) },
          tooltip: "Manufacture 1 × 10^101 Ethereum!",
        },
        "TE24": {
          name: "Total Ethereum XXIV",
          done() { return player.main.eth.gt(1e109) },
          tooltip: "Manufacture 1 × 10^109 Ethereum!",
        },
        
        
        "TE25": {
          name: "Total Ethereum XXV",
          done() { return player.main.eth.gt(1e125) },
          tooltip: "Manufacture 1 × 10^125 Ethereum!",
        },
        "TE26": {
          name: "Total Ethereum XXVI",
          done() { return player.main.eth.gt(1e141) },
          tooltip: "Manufacture 1 × 10^141 Ethereum!",
        },
        "TE27": {
          name: "Total Ethereum XXVII",
          done() { return player.main.eth.gt(1e157) },
          tooltip: "Manufacture 1 × 10^157 Ethereum!",
        },
        "TE28": {
          name: "Total Ethereum XXVIII",
          done() { return player.main.eth.gt(1e173) },
          tooltip: "Manufacture 1 × 10^173 Ethereum!",
        },
        
        "TE29": {
          name: "Total Ethereum XXIX",
          done() { return player.main.eth.gt(1e189) },
          tooltip: "Manufacture 1 × 10^189 Ethereum!",
        },
        "TE30": {
          name: "Total Ethereum XXX",
          done() { return player.main.eth.gt(1e205) },
          tooltip: "Manufacture 1 × 10^205 Ethereum!",
        },
        "TE31": {
          name: "Total Ethereum XXXI",
          done() { return player.main.eth.gt(1e221) },
          tooltip: "Manufacture 1 × 10^221 Ethereum!",
        },
        "TE32": {
          name: "Total Ethereum XXXII",
          done() { return player.main.eth.gt(1e237) },
          tooltip: "Manufacture 1 × 10^237 Ethereum!",
        },
    },
    tabFormat: [
            "blank",
            ["display-text", function() { return "Achievements: " + player.ach.achievements.length + "/" + (Object.keys(tmp.ach.achievements).length - 2) }],
            "blank", "blank",
            ["display-text", function() { return "Stellar Achievements"}],
       ["row", [["achievement", "TS1"], ["achievement", "TS2"], ["achievement", "TS3"], ["achievement", "TS4"]]],
       ["row", [["achievement", "TS5"], ["achievement", "TS6"], ["achievement", "TS7"], ["achievement", "TS8"]]],
       ["row", [["achievement", "TS9"], ["achievement", "TS10"], ["achievement", "TS11"], ["achievement", "TS12"]]],
       ["row", [["achievement", "TS13"], ["achievement", "TS14"], ["achievement", "TS15"], ["achievement", "TS16"]]],
       ["row", [["achievement", "TS17"], ["achievement", "TS18"], ["achievement", "TS19"], ["achievement", "TS20"]]],
       ["row", [["achievement", "TS21"], ["achievement", "TS22"], ["achievement", "TS23"], ["achievement", "TS24"]]],
       ["row", [["achievement", "TS25"], ["achievement", "TS26"], ["achievement", "TS27"], ["achievement", "TS28"]]],
       ["row", [["achievement", "TS29"], ["achievement", "TS30"], ["achievement", "TS31"], ["achievement", "TS32"]]],
       
       "blank", "blank", "blank", "blank",
       
       ["display-text", function() { return "Ethereum Achievements"}],
       ["row", [["achievement", "TE1"], ["achievement", "TE2"], ["achievement", "TE3"], ["achievement", "TE4"]]],
       ["row", [["achievement", "TE5"], ["achievement", "TE6"], ["achievement", "TE7"], ["achievement", "TE8"]]],
       ["row", [["achievement", "TE9"], ["achievement", "TE10"], ["achievement", "TE11"], ["achievement", "TE12"]]],
       ["row", [["achievement", "TE13"], ["achievement", "TE14"], ["achievement", "TE15"], ["achievement", "TE16"]]],
       ["row", [["achievement", "TE17"], ["achievement", "TE18"], ["achievement", "TE19"], ["achievement", "TE20"]]],
       ["row", [["achievement", "TE21"], ["achievement", "TE22"], ["achievement", "TE23"], ["achievement", "TE24"]]],
       ["row", [["achievement", "TE25"], ["achievement", "TE26"], ["achievement", "TE27"], ["achievement", "TE28"]]],
       ["row", [["achievement", "TE29"], ["achievement", "TE30"], ["achievement", "TE31"], ["achievement", "TE32"]]],
        ],
    layerShown(){return true}
})
