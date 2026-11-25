import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Wish = {
  id: string;
  name: string;
  note: string;
  createdAt: string;
};

export const wishesQueryOptions = queryOptions({
  queryKey: ["public-wishes"],
  queryFn: async (): Promise<Wish[]> => {
    const { data, error } = await supabase
      .from("rsvp_wishes")
      .select("id, name, note, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw new Error(error.message);

    return (data ?? []).flatMap((row) => {
      if (!row.id || !row.name || !row.note || !row.created_at) return [];
      return [{ id: row.id, name: row.name, note: row.note, createdAt: row.created_at }];
    });
  },
});
