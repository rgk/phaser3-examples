var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var path;
var curve;
var points;
var graphics;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ball', 'assets/sprites/shinyball.png');
}

function create ()
{
    graphics = this.add.graphics();

    path = { t: 0, vec: new Phaser.Math.Vector2() };

    points = [];

    points.push(new Phaser.Math.Vector2(50, 400));
    points.push(new Phaser.Math.Vector2(200, 200));
    points.push(new Phaser.Math.Vector2(350, 300));
    points.push(new Phaser.Math.Vector2(500, 500));
    points.push(new Phaser.Math.Vector2(700, 400));

    curve = new Phaser.Curves.Spline(points);

    this.tweens.add({
        targets: path,
        t: 1,
        ease: 'Linear',
        duration: 4000,
        yoyo: true,
        repeat: -1
    });

    var ball = this.add.follower(curve, 50, 300, 'ball').start(4000);
    var ball2 = this.add.follower(curve, 50, 250, 'ball').start(4000);
    var ball3 = this.add.follower(curve, 50, 200, 'ball').start(4000);

    // ball.start(4000);
}

function update ()
{
    graphics.clear();

    graphics.lineStyle(1, 0xffffff, 1);

    curve.draw(graphics, 64);

    graphics.fillStyle(0x00ff00, 1);

    for (var i = 0; i < points.length; i++)
    {
        graphics.fillCircle(points[i].x, points[i].y, 4);
    }

    curve.getPoint(path.t, path.vec);

    graphics.fillStyle(0xff0000, 1);
    graphics.fillCircle(path.vec.x, path.vec.y, 8);
}