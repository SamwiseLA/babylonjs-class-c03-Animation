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
        this.appMain._scene.beginAnimation(
          this.appMain.wheels[i],
          0,
          0,
          false
        );
      } else {
        this.appMain._scene.beginAnimation(this.appMain.wheels[i], 0, 30, true);
      }
    }
    this.appMain.isWheelsSpinning = !this.appMain.isWheelsSpinning;
  }
}
