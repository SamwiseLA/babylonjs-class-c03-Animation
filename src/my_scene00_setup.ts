import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my_scene00";

export default class MySceneSetUp {
  public appMain: MyScene;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }
  // Set Up Scene/Camera/Lighting
  SetUpScene(): void {
    this.appMain._scene = new BABYLON.Scene(this.appMain._engine);

    this.appMain._scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    this.appMain._camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      10,
      new BABYLON.Vector3(0, 0, 0),
      this.appMain._scene
    );

    this.appMain._camera.attachControl(this.appMain._canvas, true);

    //this.appMain._camera.setTarget(new BABYLON.Vector3(0, 3, 0));

    this.appMain._camera.wheelPrecision = 10; //Mouse wheel speed

    const lightDir = new BABYLON.Vector3(
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(45).radians()
    );

    const lightReflectionDir = new BABYLON.Vector3(-.75, 1, 0);

    //this.appMain._light = new BABYLON.DirectionalLight("dir01", lightDir, this.appMain._scene);
    //this.appMain._light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), this.appMain._scene);
    this.appMain._light = new BABYLON.HemisphericLight(
      "light",
      lightReflectionDir,
      this.appMain._scene
    );

    this.appMain._light.intensity = 0.75;

    this.appMain._camera.wheelPrecision = 20; //Mouse wheel speed

    //this.appMain._light.position = new BABYLON.Vector3(0, 150, 70);

    var textMesh = this.appMain.METHMod.DisplayText(
      `app: ${this.appMain.appName} (CLICK TO TOGGLE MUSIC)`,
      undefined,
      undefined,
      undefined,
      "yellow",
      "blue"
    );
    textMesh.position.y = 0.01;
    textMesh.position.z = -4.85;
    textMesh.scaling = new BABYLON.Vector3(3, 3, 3);
    textMesh.rotation = new BABYLON.Vector3(
      BABYLON.Tools.ToRadians(90),
      BABYLON.Tools.ToRadians(0),
      BABYLON.Tools.ToRadians(0)
    );
    textMesh.parent = this.appMain.ground;
  }

  doRender(): void {
    // Run the render loop.
    this.appMain._engine.runRenderLoop(() => {
      this.appMain._scene.render();
    });

    // The canvas/window resize event handler.
    window.addEventListener("resize", () => {
      this.appMain._engine.resize();
    });
  }
}
