/*
	Defiant Loyalty Ranks checker
	Created by Fifti 21st June 2022
	Distributed under GNU General Public Liscence (GPL) 3.0
	Refer to LISCENCE file for more information.
*/

let fs = require("fs")
const request = require("request")


fs.access("./config.txt", async (err) => {
	if (err) {
		let data = {
		"ranks": {
			"Member": 0,
			"Loyal": 4,
			"Elder": 8,
			"Veteran": 12,
			"Immortal": 24 
		},
		"TIME_UNIT_MS": 2629800000,
		"guild": "Defiant"
	}
	fs.writeFileSync("./config.txt",JSON.stringify(data))
	console.log("Created config file. Please make sure it's correct and then run this file again.")
	} else {
		
		
		let data = JSON.parse(fs.readFileSync("./config.txt"))
		let longestranklength = 0
		for (const rank of Object.keys(data["ranks"])) {
			if (rank.length > longestranklength) longestranklength = rank.length
		}
		console.log("Making request. Longest rank: " + longestranklength)
		
		const guild = await request("https://api.sk1er.club/guild/name/" + data["guild"], (error,response,body) => {
			if (error) console.error(error);
			const content = JSON.parse(body)["guild"]["members"];
			console.log("Received response...")
			for (const key of Object.keys(content)) {
				let joined = content[key]["joined"]
				let now = new Date().getTime()
				
				let index = 0;
				for (const rank of Object.keys(data["ranks"])) {
					if (content[key]["rank"] == rank) break
					index++
				}
				if (index == Object.keys(data["ranks"]).length) continue
				let correctindex = 0
				let i = 0
				for (const rank of Object.keys(data["ranks"])) {
					if (joined + (data["ranks"][rank] * data["TIME_UNIT_MS"]) < now) correctindex = i
					i++
				}
				
				if (index != correctindex) {
					console.log(strlength(content[key]["name"]," ", 16) + " - " + strlength(Object.keys(data["ranks"])[index], " ", longestranklength) + " -> " + Object.keys(data["ranks"])[correctindex])
				}
			}
			console.log("Complete. Closing in 10 seconds.")
			new Promise((resolve) => {
				setTimeout(resolve, 10000);
			});
			
		})
	}
})

function strlength(string, character, length) {
	return string + new Array(length - string.length + 1).join(character)
	
}