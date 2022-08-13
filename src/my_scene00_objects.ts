import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my_scene00";
import earcut from "./earcut/src/earcut.js";
import * as GUI from "babylonjs-gui";

export default class MySceneObjects {
  public appMain: MyScene;
  public playing = false;

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

    const meshPosition = new BABYLON.Vector3(0, 0.7, -0.5);
    const meshScaling = new BABYLON.Vector3(
      1 / this.appMain.box.scaling.x,
      1 / this.appMain.box.scaling.y,
      1 / this.appMain.box.scaling.z
    );

    var textMesh = this.appMain.METHMod.DisplayText(
      "Green Single Global Box",
      undefined,
      undefined,
      undefined,
      "black",
      "green"
    );
    textMesh.position = meshPosition;
    textMesh.scaling = meshScaling;
    textMesh.parent = this.appMain.box;

  }

  SpawnButton(): void {
    var manager = new GUI.GUI3DManager();
    // Text only button

    const onTexture = "https://raw.githubusercontent.com/microsoft/MixedRealityToolkit-Unity/main/Assets/MRTK/SDK/StandardAssets/Textures/IconSwitchOn.png";
    const offTexture = "https://raw.githubusercontent.com/microsoft/MixedRealityToolkit-Unity/main/Assets/MRTK/SDK/StandardAssets/Textures/IconSwitchOff.png";

    var touchHoloTextButton = new GUI.HolographicButton("TouchHoloTextButton");
    manager.addControl(touchHoloTextButton);
    
    touchHoloTextButton.position = new BABYLON.Vector3(0, .5, -2);
    const unClicked = "Click Music! On"
    touchHoloTextButton.text = unClicked;
    touchHoloTextButton.imageUrl = offTexture;
    touchHoloTextButton.onPointerDownObservable.add(() => {
        this.appMain.METHMod.PlaySound();
        //alert("I was Clicked!!!")
        this.EnvironmentSound();
        
        if (touchHoloTextButton.text === unClicked){
          touchHoloTextButton.imageUrl = onTexture
          touchHoloTextButton.text = "Click Music! Off";
        } else {
          touchHoloTextButton.text = unClicked;
          touchHoloTextButton.imageUrl = offTexture
        }

    });

  }

  BuildCar() : BABYLON.Mesh {
    const carMat = new BABYLON.StandardMaterial("carMat", this.appMain._scene);
    carMat.diffuseColor = BABYLON.Color3.Blue();

    const wheelMat = new BABYLON.StandardMaterial("carMat", this.appMain._scene);
    wheelMat.diffuseColor = BABYLON.Color3.Black();

    const carBodyLen = 3.5;
    const carBodyHgt = 1.25;
    const carFrontLen = 3;
    const carBodyDepth = 2;

    const carBodyMesh = this.appMain.OBJMod.ExtrudeMesh(carBodyLen, carBodyHgt, carFrontLen, carBodyDepth, -3, -3);
    carBodyMesh.material = carMat;

    carBodyMesh.scaling = new BABYLON.Vector3(.5,.5,.5)
    const carBodyText = this.appMain.METHMod.DisplayText("Extruded Mesh for Car Body & CreateCylinder for Wheels");
    carBodyText.parent = carBodyMesh;
    carBodyText.position.y = .05
    carBodyText.position.z = -2
    carBodyText.rotation.x = BABYLON.Tools.ToRadians(90)

    carBodyText.scaling = new BABYLON.Vector3(3,3,3)

    const wheels: BABYLON.Mesh[]  = [undefined, undefined, undefined, undefined];

    wheels[0] = this.BuildWheels(carBodyLen / 4, .4)
    wheels[0].parent = carBodyMesh;
    wheels[0].name = "wheelLF"
    wheels[0].material = wheelMat;
    wheels[0].position.x = (carBodyMesh.position.x + ((carBodyLen + carFrontLen) / 2)) - (carBodyLen / 4);
    wheels[0].position.y =  - (carBodyDepth) ;
    wheels[0].position.z = -3;

    wheels[1] =  wheels[0].clone("wheelLB");
    wheels[1].position.x = -wheels[0].position.x

    wheels[2] =  wheels[0].clone("wheelRF");
    wheels[2].position.y =   0

    wheels[3] =  wheels[2].clone("wheelLB");
    wheels[3].position.x = -wheels[2].position.x

    return carBodyMesh

  }

  BuildWheels(diam = .125, hgt = .05): BABYLON.Mesh {
    const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {diameter: diam, height: hgt})

    return wheelRB
  }

  ExtrudeMesh(
    bodyLength = 5,
    bodyHeight = 2,
    frontLength = 1.75,
    bodyDepth = 0.2,
    startX = 0,
    startZ = 0,
    showAngleMesh =  false
  ): BABYLON.Mesh {
    this.appMain.METHMod.DMM("ExtrudeMesh");
    // Calc Mesh Extrude

    const extMat = new BABYLON.StandardMaterial("ExtMat", this.appMain._scene)
    extMat.diffuseColor = BABYLON.Color3.Yellow();

    const endZ = startZ + bodyHeight;

    var startX2 = startX + bodyLength + frontLength;

    const bodyStartX = startX + bodyLength;

    const distZ = endZ - startZ;

    const outline1 = [
      new BABYLON.Vector3(startX, 0, startZ),
      new BABYLON.Vector3(startX2, 0, startZ),
    ];
    const outline2 = [
      new BABYLON.Vector3(startX, 0, startZ),
      new BABYLON.Vector3(startX2, 0, startZ),
    ];

    //curved front
    const extrudes = 20;

    for (let i = 0; i < extrudes; i++) {
      var posX = frontLength * Math.cos((i * Math.PI) / (extrudes * 2));
      posX = frontLength - posX;
      posX = startX2 - posX;
      //const posz = distZ * Math.sin((i * Math.PI) / (extrudes * 2)) - frontLength
      var posZ = distZ * Math.sin((i * Math.PI) / (extrudes * 2));
      posZ = distZ - posZ;
      posZ = endZ - posZ;
      if (i === 0) {
        posZ = startZ;
      }

      outline1.push(new BABYLON.Vector3(posX, 0, posZ));
    }

    //top
    outline1.push(new BABYLON.Vector3(bodyStartX, 0, endZ));
    outline1.push(new BABYLON.Vector3(startX, 0, endZ));

    outline2.push(new BABYLON.Vector3(bodyStartX, 0, endZ));
    outline2.push(new BABYLON.Vector3(startX, 0, endZ));
    //back formed automatically

    const extrudeMesh = BABYLON.MeshBuilder.ExtrudePolygon(
      "extrudeMesh",
      { shape: outline1, depth: bodyDepth },
      this.appMain._scene,
      earcut
    );

    extrudeMesh.material = extMat

    extrudeMesh.position.y = 2;
    extrudeMesh.rotation = new BABYLON.Vector3(
      BABYLON.Tools.ToRadians(-90),
      BABYLON.Tools.ToRadians(0),
      BABYLON.Tools.ToRadians(0)
    );

    if (showAngleMesh) {
      const extrudeMeshChild = BABYLON.MeshBuilder.ExtrudePolygon(
        "extrudeMeshChild",
        { shape: outline2, depth: bodyDepth },
        this.appMain._scene,
        earcut
      );
      extrudeMeshChild.parent = extrudeMesh;
      extrudeMeshChild.position.y = -.5 - (bodyDepth - .2);
    }

    return extrudeMesh

  }

  // Environment Node Objects (Ground, Trees, Buildings, Sound)

  EnvironmentNodes(): void {
    this.appMain.METHMod.DMM("EnvironmentNodes");
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

  }

  EnvironmentSound(): void {

    const uri =
    "https://dl.dropbox.com/s/rgm7xqiguux0t0d/Girl%20From%20Ipanema%20-%20Frank%20Sinatra.mp3"

    BABYLON.Engine.audioEngine?.unlock();

    if (this.playing) {
      if (this.appMain.music) {
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
    this.playing = !this.playing;

  }
}
