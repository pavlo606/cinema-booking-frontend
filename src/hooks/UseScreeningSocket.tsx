import { socket } from "@/api/socket";
import type { Booking } from "@/dto/booking.dto";
import { useEffect } from "react";

export function useScreeningSocket(screeningId: number | undefined, onUpdate: (_: Booking[]) => void) {
  if (!screeningId) return

  useEffect(() => {
    socket.emit("joinScreening", screeningId);

    socket.on("seatsUpdated", onUpdate);

    return () => {
      socket.emit("leaveScreening", screeningId);
      socket.off("seatsUpdated");
    };
  }, [screeningId]);
}
