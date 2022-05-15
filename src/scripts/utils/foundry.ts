export const createSceneControlButton = (
  sceneControlContainer: SceneControl,
  newTool: SceneControlTool
) => {
  sceneControlContainer.tools.push(newTool);
};
