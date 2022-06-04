import BaseData from "./baseData";

export type CreatureStatus = "not-seen" | "seen" | "caught";

type CreatureTracking = {
  status: CreatureStatus;
};

export type UserCreaturesTrackingObject = { [key: number]: CreatureTracking };

type UserCreaturesTrackingParams = {
  baseDir: string;
  userId: string;
};

export class UserCreaturesTracking extends BaseData<UserCreaturesTrackingObject> {
  private userId: string;

  constructor({ baseDir, userId }: UserCreaturesTrackingParams) {
    super({
      fileName: `user_${userId}_tracker.json`,
      baseDir,
    });

    this.userId = userId;
  }

  get defaultData(): UserCreaturesTrackingObject {
    return {};
  }

  get user() {
    return [...((game as Game)?.users || [])].find(
      (user) => user.id === this.userId
    );
  }

  async setCreaturesTracking(trackings: UserCreaturesTrackingObject) {
    this.uploader.upload(trackings);
  }
}
