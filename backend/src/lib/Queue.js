import Bee from 'bee-queue';
import redisConfig from '../config/redis';

import CancellationMail from '../app/jobs/CancellationDelivery';
import NewDelivery from '../app/jobs/NewDelivery';

const jobs = [CancellationMail, NewDelivery];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee
      .createJob(job)
      .retries(3)
      .save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee
        .on('failed', this.handleFailure)
        .on('retrying', this.handleRetry)
        .process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }

  handleRetry(job, err) {
    console.log(
      `Job ${job} failed with error ${err.message} but is being retried!`
    );
  }
}

export default new Queue();
