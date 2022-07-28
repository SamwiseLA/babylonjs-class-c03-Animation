import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my_scene00";

export default class MySceneObjects {
  public appMain: MyScene;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }

  SpawnTestBox(): void {
    this.appMain.METHMod.DMM("SpawnBox");

    const mat = new BABYLON.StandardMaterial("Material", this.appMain._scene);
    mat.diffuseColor = BABYLON.Color3.Green();

    // Our built-in 'box' shape. Params: name, options, scene
    this.appMain.box = BABYLON.MeshBuilder.CreateBox("box", {});

    this.appMain.box.material = mat;

    this.appMain.box.scaling = new BABYLON.Vector3(0.5, 1.5, 0.5);

    this.appMain.box.position.y = this.appMain.box.scaling.y / 2; //box created with default size so height is 1
    this.appMain.box.position.z = -4;
    this.appMain.box.position.x = -4;

    // Move the sphere upward 1/2 its height
    //this.appMain.box.position.y = 2;    //this.appMain.box.position = new BABYLON.Vector3(0, 0.5, -5);

    //this.appMain.box.rotation = this._light.direction;
    //this.appMain.box.scaling.x = .1;
    //this.appMain.box.scaling.z = 0.1;

    const meshPosition = new BABYLON.Vector3(0, .7, -.5);
    const meshScaling = new BABYLON.Vector3((1 / this.appMain.box.scaling.x), (1 / this.appMain.box.scaling.y), (1 / this.appMain.box.scaling.z));

    var textMesh = this.appMain.METHMod.DisplayText("Green Single Global Box", undefined,undefined,undefined, "black", "green");
    textMesh.position = meshPosition;
    textMesh.scaling = meshScaling
    textMesh.parent = this.appMain.box
  }

  // Environment Node Objects (Ground, Trees, Buildings, Sound)

  EnvironmentNodes(): void {
    // Ground

    this.appMain.ground = BABYLON.MeshBuilder.CreateGround("ground", {
      width: 10,
      height: 10,
    });

    const mat = new BABYLON.StandardMaterial(
      "groundMaterial",
      this.appMain._scene
    );
    mat.diffuseTexture = new BABYLON.Texture(
      "https://www.babylonjs-playground.com/textures/floor.png",
      this.appMain._scene
    );

    this.appMain.ground.material = mat;

    const uri =
      "https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1734282589813867336/ogg_Girl_From_Ipanema_-_Frank_Sinatra.ogg";

    var playing = false;
    document.onclick = () => {
      BABYLON.Engine.audioEngine?.unlock()

      if (playing) {
        if (this.appMain.music){
          this.appMain.music.pause();
        }
      } else {
        if (!this.appMain.music) {
          this.appMain.music = new BABYLON.Sound(
            "sound1",
            uri,
            this.appMain._scene,
            null,
            { loop: true, autoplay: true, volume: 0.05 }
          );
        }
        this.appMain.music.play();
      }
      playing = !playing;
    };
  }

  IntervalSound() {
    // Load Repeating the sound,
    // give it time to load and play it every 3 seconds
    //

    const bounce = new BABYLON.Sound(
      "bounce",
      "https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1907681589261763077/ogg_321808__lloydevans09__pvc-pipe-hit-3.ogg",
      this.appMain._scene,
      null,
      { loop: false, autoplay: false, volume: 0.2 }
    );

    this.appMain.METHMod.DelayIt(5);

    setInterval(() => bounce.play(), 3000);
  }
}
