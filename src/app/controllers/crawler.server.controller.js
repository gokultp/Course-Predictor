'use strict';

import {CronJob} from 'cron';

var consistencyCron = new CronJob({
	cronTime: '10 * * * * *',
	onTick:()=>{
		console.log("Done---------------");
	},
	start:true
});

export function runCron(){
	consistencyCron.start();
}
