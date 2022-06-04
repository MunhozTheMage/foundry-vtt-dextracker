import { Creatures } from "./creatures";
import { UserCreaturesTracking } from "./userCreaturesTracking";

export abstract class Data {
  static CreaturesData: Creatures;
  static UserCreaturesTrackingDataCollection: {
    [key: string]: UserCreaturesTracking;
  };

  public static async init(baseDir: string) {
    Data.CreaturesData = new Creatures({ baseDir });
    await Data.CreaturesData.init();
  }

  public static async postInit(baseDir: string) {
    Data.UserCreaturesTrackingDataCollection = (
      (game as Game).users || []
    ).reduce(
      (collection, user) => ({
        ...collection,
        [user.id]: new UserCreaturesTracking({
          baseDir: `${baseDir}/userData`,
          userId: user.id,
        }),
      }),
      {}
    );

    await Promise.all(
      Object.values(Data.UserCreaturesTrackingDataCollection).map((data) =>
        data.init()
      )
    );
  }
}
