"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Cars",
			[
				{
					userId: 1,
					carMake: "BMW",
					carModel: "Z4 Roadster",
					carYear: 2020,
					pricePerDay: 149,
					carImage:
						"https://cache.bmwusa.com/cosy.arox?pov=walkaround&brand=WBBM&vehicle=21ZA&client=byo&paint=P0C10&fabric=FK8SW&sa=S01SU,S02TB,S0302,S0319,S0387,S03MB,S0430,S0431,S0459,S0465,S0493,S04AT,S04AW,S0534,S0544,S05AC,S0676,S06AC,S06AK,S06C4,S06U3,S0711,S07AC&date=20200702&angle=40&quality=65&sharp=100&resp=png&BKGND=TRANSPARENT&width=1279",
					countryName: "United States",
					stateName: "Nevada",
					cityName: "Las Vegas",
					address: "1554 N Christy Ln",
					seats: 2,
					electric: "no",
					autonomous: "no",
					roadsideAssistance: "yes",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Cars", null, {});
	},
};
