function init() {
    const canvas = document.querySelector("#renderCanvas");
    const engine = new BABYLON.Engine(canvas);

    engine.enableOfflineSupport = false; // Suppress manifest reference

    const createScene = function() {

        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0, 1, 1);

        const meshes = [];

        Promise.all([
            BABYLON.SceneLoader.ImportMeshAsync(null, "./gltf/", "Fox.gltf", scene).then(function(result) {
                const scale = 0.05;
                const mesh = result.meshes[0];
                const modelScaling = mesh.scaling;
                mesh.scaling = new BABYLON.Vector3(modelScaling.x * scale, modelScaling.y * scale, modelScaling.z * scale);
                mesh.position = new BABYLON.Vector3(0, 0, 0);
                meshes.push(mesh);
            }),
        ]).then(() => {
            const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
            camera.setPosition(new BABYLON.Vector3(0, 5, 15));
            //camera.attachControl(canvas, false, false);
            scene.activeCamera = camera;
            let light0 = new BABYLON.HemisphericLight("light0", new BABYLON.Vector3(1, 1, 0), scene); 

            engine.runRenderLoop(function() {
                scene.activeCamera.alpha -= 0.01;
                scene.render();
            });
        });
        return scene;
    }
    
    const scene = createScene();

    window.addEventListener('resize', function(){
        engine.resize();
    });
}

init();
