class Food extends BaseEntity {
  constructor(x, y) {
    super(BaseEntity.sprite.bullet, 1, x, y, 0, 0);
    this.protein = 1;
  }

  update() {

    
    gameState.entities.some(singleInstance => {
      // if (this.energy > 0 && singleInstance.scoreReward && singleInstance.energy > 0 && this.getDistance(singleInstance, 4).isClose) {
      //   this.energy--;
      //   singleInstance.energy--;
      //   // Could be nice to push the entity using this.vx and this.vy of the bullet
      //   singleInstance.x += this.vx / 4;
      //   singleInstance.y += this.vx / 4;
      //   if (singleInstance.energy <= 0) {
      //     gameState.score += singleInstance.scoreReward;
      //     gameState.entities.push(new Robot());
      //   }
      // }
      // return this.energy <= 0;
    });
    // move & render
    super.update();
    this.render();
  }
}
