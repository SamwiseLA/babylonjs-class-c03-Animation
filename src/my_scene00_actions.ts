import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my_scene00";

export default class MySceneActions {
  public appMain: MyScene;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }

  ToggleWheelAnimation(): void {
    this.appMain.METHMod.DMM("ToggleWheelAnimation");

    for (let i = 0; i < 4; i++) {
      if (this.appMain.isWheelsSpinning) {
        this.appMain._scene.beginAnimation(this.appMain.wheels[i], 0, 0, false);
      } else {
        this.appMain._scene.beginAnimation(this.appMain.wheels[i], 0, 30, true);
      }
    }
    this.appMain.isWheelsSpinning = !this.appMain.isWheelsSpinning;
  }

  ToggleObjectAnimation(object: BABYLON.Mesh): void {
    this.appMain.METHMod.DMM("ToggleObjectAnimation");

    const framesTotal = 150; // Time 30 frames a second - 5 secs
    const xCenter = 0;
    const distTotal = 16;
    const xStart = xCenter - distTotal / 2;
    const xEnd = xCenter + distTotal / 2;
    const speed = framesTotal / distTotal;

    this.appMain.animCar = new BABYLON.Animation(
      "carAnimation",
      "position.x",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const objectKeys = [];

    console.log`Current Position: ${this.appMain.car.position}`;
    const currentX = this.appMain.car.position.x;

    //this.appMain.animCar = undefined;

    if (this.appMain.isObjectMoving) {
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

      const dist = xEnd - currentX;
      const endFrame = dist * speed;

      objectKeys.push({
        frame: endFrame,
        value: xEnd,
      });

      objectKeys.push({
        frame: Math.ceil(endFrame),
        value: xStart,
      });

      objectKeys.push({
        frame: framesTotal,
        value: currentX,
      });
    }

    this.appMain.animCar.setKeys(objectKeys);

    object.animations = [];
    object.animations.push(this.appMain.animCar);

    this.appMain._scene.beginAnimation(object, 0, 150, true);

    this.appMain.isObjectMoving = !this.appMain.isObjectMoving;
  }
}
