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

  public box: BABYLON.Mesh[] = [undefined, undefined, undefined, undefined];
  public boxMat: BABYLON.StandardMaterial[] = [undefined, undefined, undefined, undefined];
  //public barn: BABYLON.Mesh[] = [undefined];

  //public object: BABYLON.AbstractMesh[] = [undefined, undefined, undefined];

  public car: BABYLON.AbstractMesh[] = [undefined, undefined];
  public animCar: BABYLON.Animation[] = [undefined];
  public wheels: BABYLON.AbstractMesh[][] = [[undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined]];
  public isObjectMoving = [false, false];
  public isWheelsSpinning = [false, false];

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

    this.box[0] = this.OBJMod.SpawnTestBox();
    this.box[0].position.z = this.box[0].position.z + 1.5
    
    this.box[1] = this.OBJMod.SpawnTestBox();
    this.box[1].position.z = this.box[0].position.z - 2
    this.boxMat[1] = new BABYLON.StandardMaterial("boxMat1",this._scene);
    this.boxMat[1].diffuseColor = BABYLON.Color3.Blue();
    this.box[1].material = this.boxMat[1];

    this.box[2] = this.OBJMod.SpawnTestBox();
    this.box[2].position.z = this.box[0].position.z
    this.box[2].position.x = 4
    this.boxMat[2] = new BABYLON.StandardMaterial("boxMat1",this._scene);
    this.boxMat[2].diffuseColor = BABYLON.Color3.Yellow();
    this.box[2].material = this.boxMat[2];

    this.box[3] = this.OBJMod.SpawnTestBox();
    this.box[3].position.z = this.box[1].position.z
    this.box[3].position.x = 4
    this.boxMat[3] = new BABYLON.StandardMaterial("boxMat1",this._scene);
    this.boxMat[3].diffuseColor = BABYLON.Color3.Red();
    this.box[3].material = this.boxMat[3];


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

    this.car[0] = this.OBJMod.BuildCar();
    this.car[0].position = new BABYLON.Vector3(2.25, 1.75, -4);
    //this.car.rotation.y = BABYLON.Tools.ToRadians(45);

    await this.OBJMod.BuildCarFromMeshObject();

    this.car[1].position = new BABYLON.Vector3(-2.25, 1.75, 0);

    this.OBJMod.SpawnButtonAnimation();
    this.OBJMod.SpawnButtonAnimation2();
  }
}
