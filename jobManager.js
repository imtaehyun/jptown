var Promise = require('bluebird'),
    later = require('later'),
    moment = require('moment'),
    database = require('./database'),
    Job = require('./job'),
    logger = require('./config/logger');

database.getJobList().then(function(jobList) {
    Promise.each(jobList, function(job, idx, length) {
        var now = moment();
        var sched = later.parse.cron(job.schedule, true);
        var nextRunTime = later.schedule(sched).next(1, job.lastExecTime.iso);

        if (now.isAfter(nextRunTime)) {
            logger.info('=== [JOB] ' + job.jobName + ' 시작 ===');

            logger.debug('마지막 실행수행시간 : ', moment(job.lastExecTime.iso).format());
            logger.debug('다음 수행 시간 : ', moment(nextRunTime).format());
            logger.debug('현재시간 : ', now.format());

            // Job실행
            Job[job.jobName]();

            // 마지막 Job 실행시간 update
            job.lastExecTime.iso = now.format();
            database.updateJobLastExecTime(job).then(function(response) {
                logger.debug(response);
            });

            logger.info('=== [JOB] ' + job.jobName + ' 종료 ===');
        }
    });
});
