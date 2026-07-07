import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sessionsService } from "@/services/sessions";
import { chatService } from "@/services/chat";
import { exportService } from "@/services/export";
import { toast } from "sonner";
import { ApiError } from "@/lib/api";
import type { ChatRequest, ExportRequest, CreateSessionRequest } from "@/types/api";

const errText = (e: unknown) =>
  e instanceof ApiError ? e.message : e instanceof Error ? e.message : "Something went wrong";

export function useSessions() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: () => sessionsService.list(),
    staleTime: 30_000,
  });
}

export function useSession(id: string | null) {
  return useQuery({
    queryKey: ["sessions", id],
    queryFn: () => sessionsService.get(id!),
    enabled: !!id,
  });
}

export function useCreateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSessionRequest) => sessionsService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sessions"] }),
    onError: (e) => toast.error("Could not create chat", { description: errText(e) }),
  });
}

export function useDeleteSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => sessionsService.remove(id),
    onSuccess: (_d, id) => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.removeQueries({ queryKey: ["sessions", id] });
      toast.success("Chat deleted");
    },
    onError: (e) => toast.error("Delete failed", { description: errText(e) }),
  });
}

export function useSendMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: ChatRequest) => chatService.send(payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      if (data.session_id) {
        qc.invalidateQueries({ queryKey: ["sessions", data.session_id] });
      }
    },
    onError: (e) => {
      toast.error("Message failed", {
        description: errText(e),
        action: { label: "Retry", onClick: () => undefined },
      });
    },
  });
}

export function useExport() {
  return useMutation({
    mutationFn: (payload: ExportRequest) => exportService.download(payload),
    onSuccess: (r) => toast.success("Export ready", { description: r.filename }),
    onError: (e) => toast.error("Export failed", { description: errText(e) }),
  });
}
