import { Attr, Model, Str } from "@vuex-orm/core";
import { Gender } from "./enums";

class User extends Model {
  @Attr(null)
  id!: number;

  @Str("")
  username!: string;

  @Str(null, { nullable: true })
  nickname!: string | null;

  @Str("")
  gender!: Gender;
}

export default User;
