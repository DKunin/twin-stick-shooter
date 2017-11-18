class Player extends BaseEntity {
  constructor() {
    super(BaseEntity.sprite.player, 64, gameState.size / 2, gameState.size / 2);
  }

  update() {
    if (this.energy <= 0) return;

    this.vx = gameState.keysDown.a ? -1 : gameState.keysDown.d ? 1 : 0;
    this.vy = gameState.keysDown.w ? -1 : gameState.keysDown.s ? 1 : 0;

    if (this.x > gameState.size) {
      this.x = gameState.size;
    }
    if (this.x < 0) {
      this.x = 0;
    }

    if (this.y > gameState.size) {
      this.y = gameState.size;
    }

    if (this.y < 0) {
      this.y = 0;
    }

    if (gameState.keysDown[' ']) {
      let bvx, bvy;
      bvx = gameState.keysDown.ArrowRight || 0;
      bvx -= gameState.keysDown.ArrowLeft || 0;
      bvy = gameState.keysDown.ArrowDown || 0;
      bvy -= gameState.keysDown.ArrowUp || 0;

      if (bvx || bvy) {
        const speed = 4; // We want the bullets to zip around the arena
        gameState.entities.push(
          new Bullet(this.x, this.y, bvx * speed, bvy * speed)
        );
      }

      // const BulletVx = gameState.keysDown.ArrowLeft ? -1 : gameState.keysDown.ArrowRight ? 1 : 0;
      // const BulletVy = gameState.keysDown.ArrowDown ? 1 : gameState.keysDown.ArrowUp  ? -1 : 0;
      // if (BulletVx || BulletVy) {
      //   gameState.entities.push(new Bullet(this.x, this.y, BulletVx, BulletVy));
      // }
    }

    if (gameState.keysDown.b) {
      const BulletVx = gameState.keysDown.ArrowLeft
        ? -0.1
        : gameState.keysDown.ArrowRight ? 0.1 : 0;
      const BulletVy = gameState.keysDown.ArrowDown
        ? 0.1
        : gameState.keysDown.ArrowUp ? -0.1 : 0;
      gameState.entities.push(new Bullet(this.x, this.y, BulletVx, BulletVy));
    }

    // move & render
    super.update();
    this.render();
  }
}
