class Robot extends BaseEntity {
  constructor(genes = { speed: 0.6 }) {
    const robotType = Math.floor(Math.random() ** 3 * 4);
    const max = gameState.size;

    super(BaseEntity.sprite.robot + robotType, 10, Math.random() * 256, Math.random() * 256);

    this.scoreReward = 2 ** robotType;
    this.speed = genes.speed;
    this.age = 0;
  }

  update() {
    const probablity = 0.2;
    const distanceToPlayer = this.getDistance(gameState.player, 8);

    if (this.age % 1001 === 1000) {
      // Spawn children
      console.log('spawn cycle');
      if (this.energy > 8) {
        gameState.entities.push(new Robot(this.genes));
      }
    };
    // gameState.entities.some(singleInstance => {
    //   if (
    //     this.energy > 0 &&
    //     singleInstance.protein &&
    //     singleInstance.energy > 0 &&
    //     this.getDistance(singleInstance, 4).isClose
    //   ) {
    //   }
    //   return this.energy <= 0;
    // });

    const food = gameState.entities
      .reduce((newArr, singleInstance) => {
        if (singleInstance.protein) {
          return newArr.concat({
            instance: singleInstance, 
            d: this.getDistance(singleInstance, 4)
          });
        }
        return newArr;
      }, [])
      .sort((a, b) => {
        return Math.hypot(a.d.x, a.d.y) > Math.hypot(b.d.x, b.d.y) ? 1 : -1;
      });

    const closest = food[0] || { d: { x: 0, y: 0} };


    this.vx = Math.random() < probablity ? Math.sign(closest.d.x) : 0;
    this.vy = Math.random() < probablity ? Math.sign(closest.d.y) : 0;
    this.age += 1;
    if (this.vx !== 0 || this.vx !== 0) {
      this.energy -= 0.05;
    } else {
      this.energy -= 0.01;

    }

    if (this.x > gameState.size) {
      this.x = 0;
    }

    if (this.x < 0) {
      this.x = gameState.size;
    }

    if (this.y > gameState.size) {
      this.y = 0;
    }

    if (this.y < 0) {
      this.y = gameState.size;
    }

    if (closest.d.isClose && closest.instance.energy > 0) {
      closest.instance.energy -= 1;
      this.energy += closest.instance.protein;
      if (this.energy > this.totalEnergy) {
        this.energy = this.totalEnergy;
      }
    }

    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;
    this.render();
  }
}
