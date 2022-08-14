import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";

// Import App Modules

import MySceneSetUp from "./my_scene00_setup";
import MySceneObjects from "./my_scene00_objects";
import MySceneMethods from "./my_scene00_methods";
import MySceneActions from "./my_scene00_actions";

export default class MyScene {
  public appName: string;

  public _canvas: HTMLCanvasElement;
  public _engine: BABYLON.Engine;
  public _scene: BABYLON.Scene;
  //public _camera: BABYLON.FreeCamera;
  public _camera: BABYLON.ArcRotateCamera;
  //public _light: BABYLON.DirectionalLight;
  public _light: BABYLON.HemisphericLight;
  //public _radianVal: number;

  ////////////////////////////////
  // MODULES
  ////////////////////////////////

  public SUMod: MySceneSetUp; // Set Up Module
  public OBJMod: MySceneObjects; // Node/Objects Module
  public METHMod: MySceneMethods; // Methods/Functions
  public ACTMod: MySceneActions; // Action Mether/Functions

  ////////////////////////////////
  // OBJECTS
  ////////////////////////////////

  public box: BABYLON.Mesh;
  //public barn: BABYLON.Mesh[] = [undefined];

  //public object: BABYLON.AbstractMesh[] = [undefined, undefined, undefined];

  public wheels: BABYLON.Mesh[] = [undefined, undefined, undefined, undefined];
  public isWheelsSpinning = false;

  public ground: BABYLON.Mesh;
  public music: BABYLON.Sound;

  public objectFileURL = [
    "https://cdn-content-ingress.altvr.com/uploads/model/gltf/1691175786641359242/",
    "https://cdn-content-ingress.altvr.com/uploads/model/gltf/2052010387502531539/",
    "https://cdn-content-ingress.altvr.com/uploads/model/gltf/2050551949928956602/",
  ];
  public objectFileName = [
    "GRIMECRAFT_Master_Sword.glb",
    "viva_balloon.glb",
    "CurtsShinyGreenBox.glb",
  ];

  constructor(canvasElement: string) {
    // Create canvas and engine.
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  async createScene(): Promise<BABYLON.Scene> {
    //Moduel for Scene Setup
    this.SUMod = new MySceneSetUp();
    this.SUMod.appMain = this;

    //Moduel to Create all Node Objects
    this.OBJMod = new MySceneObjects();
    this.OBJMod.appMain = this;

    //Moduel for Standard Methods/Functions
    this.METHMod = new MySceneMethods();
    this.METHMod.appMain = this;

    //Moduel for Action Methods/Functions
    this.ACTMod = new MySceneActions();
    this.ACTMod.appMain = this;

    // Instanciate Modules

    this.METHMod.TestModule();
    this.ACTMod.TestModule();
    this.OBJMod.TestModule();

    // Set Up Scene/Camera/Lighting
    this.SUMod.SetUpScene();

    this.StartScene();

    return this._scene;
  }

  // Code for Scene

  async StartScene(): Promise<void> {
    this.OBJMod.SpawnTestBox();

    this.OBJMod.SpawnButton();

    this.OBJMod.EnvironmentNodes();

    const extrudedMesh = this.OBJMod.ExtrudeMesh(4, 2, 4, 1, -3, 0, true);
    const extText = this.METHMod.DisplayText(
      "Extruded Mesh Paired with Not Extruded Child"
    );
    extText.parent = extrudedMesh;
    extText.position.y = 0.05;
    extText.position.z = 0;
    extText.rotation.x = BABYLON.Tools.ToRadians(90);
    extText.scaling = new BABYLON.Vector3(3, 3, 3);

    const car = this.OBJMod.BuildCar();
    car.position = new BABYLON.Vector3(2.25, 1.75, -4);
    car.rotation.y = BABYLON.Tools.ToRadians(45);

    this.OBJMod.SpawnButtonWheelAnimation();
  }
}
