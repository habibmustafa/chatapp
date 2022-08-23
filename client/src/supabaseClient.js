import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// register
export const singUpWithEmail = async (data) => {
   const { user, error } = await supabase.auth.signUp(data);
   const { table } = await supabase
      .from("messages")
      .insert([{ user_id: user.id}]);
   console.log(table);
   if (user) {
      console.log(user);
   } else {
      console.log(error.message);
   }
   return { table, user, error };
};

// signIn
export const signInWithEmail = async (data2) => {
   const { user, error } = await supabase.auth.signIn(data2);
   let { data: messages } = await supabase.from("messages").select("*");
   console.log(messages);
   if (user) {
      console.log(user);
   } else {
      console.log(error.message);
   }
   return { data: messages, user, error };
};

// signOut
export const signOutWithEmail = async () => {
   const { error } = await supabase.auth.signOut();
   if (error) {
      console.log(error);
   } else {
      console.log("signOut!");
   }
   return { error };
};

// updateUser
export const updateUser = async (data) => {
   const { user, error } = await supabase.auth.update(data);

   if (user) {
      console.log(user);
   } else {
      console.log(error.message);
   }
   return { user, error };
};
