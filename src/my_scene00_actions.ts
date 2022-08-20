import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my_scene00";

export default class MySceneActions {
  public appMain: MyScene;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }

  ToggleWheelAnimation(carNum = 0): void {
    this.appMain.METHMod.DMM("ToggleWheelAnimation");

    for (let i = 0; i < 4; i++) {
      if (this.appMain.wheels[carNum][i]) {
        if (this.appMain.isWheelsSpinning[carNum]) {
          this.appMain._scene.beginAnimation(
            this.appMain.wheels[carNum][i],
            0,
            0,
            false
          );
        } else {
          this.appMain._scene.beginAnimation(
            this.appMain.wheels[carNum][i],
            0,
            30,
            true
          );
        }
      }
    }
    this.appMain.isWheelsSpinning[carNum] =
      !this.appMain.isWheelsSpinning[carNum];
  }

  ToggleObjectAnimation(object: BABYLON.AbstractMesh): void {
    this.appMain.METHMod.DMM(`ToggleObjectAnimation: ${object.name}`);

    let i = 0;
    for (var j = 0; j < this.appMain.car.length; j++) {
      const carName = this.appMain.car[j].name;
      if (object.name === carName) {
        i = j;
        break;
      }
    }

    const framesTotal = [150, 150]; // Time 30 frames a second - 5 secs
    const xCenter = [0, 0];
    const distTotal = [16, 16];
    const dir = [1, 1]; // -1 Right to left

    const xStart = [xCenter[0] - distTotal[0] / 2];
    const xEnd = [xCenter[0] + distTotal[0] / 2];
    if (dir[0] < 0) {
      const newEnd = xStart[0];
      xStart[0] = xEnd[0] * 1;
      xEnd[0] = newEnd * 1;
    }
    const speed = [
      framesTotal[0] / distTotal[0],
      framesTotal[1] / distTotal[1],
    ];

    xStart.push(xCenter[1] - distTotal[1] / 2);
    xEnd.push(xCenter[1] + distTotal[1] / 2);
    if (dir[1] < 0) {
      const newEnd = xStart[1];
      xStart[1] = xEnd[1] * 1;
      xEnd[1] = newEnd * 1;
    }

    const carTotal = this.appMain.car.length;

    if (this.appMain.car[i] !== undefined && xCenter[i] !== undefined) {
      const animation = new BABYLON.Animation(
        `carAnimation_${i}`,
        "position.x",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );

      if (i === 0) {
        this.appMain.animCar[0] = animation;
      } else {
        this.appMain.animCar.push(animation);
      }

      var objectKeys = [];

      console.log`Current Position: ${this.appMain.car[i].position}`;
      const currentX = this.appMain.car[i].position.x;

      //this.appMain.animCar = undefined;

      if (this.appMain.isObjectMoving[i]) {
        //
        objectKeys.push({
          frame: 0,
          value: currentX,
        });

        objectKeys.push({
          frame: 30,
          value: currentX,
        });

        //
      } else {
        //
        objectKeys.push({
          frame: 0,
          value: currentX,
        });

        const dist = Math.abs(xEnd[i] - currentX);
        const endFrame = dist * speed[i];

        objectKeys.push({
          frame: endFrame,
          value: xEnd[i],
        });

        objectKeys.push({
          frame: endFrame,
          value: xStart[i],
        });

        objectKeys.push({
          frame: framesTotal[i],
          value: currentX,
        });
      }

      this.appMain.animCar[i].setKeys(objectKeys);

      object.animations = [];
      object.animations.push(this.appMain.animCar[i]);

      this.appMain._scene.beginAnimation(object, 0, 150, true);

      this.appMain.isObjectMoving[i] = !this.appMain.isObjectMoving[i];
    }
  }
}
