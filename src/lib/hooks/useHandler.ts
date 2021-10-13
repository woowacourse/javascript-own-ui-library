import { DomEvent, Handler } from "../@types/types";
import store from "../store";

const useHandler = (
  event: DomEvent,
  handler: Handler,
  shouldUpdate: boolean = true
) => {
  const vStorage = store.getCurrentVStorage();
  const prevHandler = vStorage
    .getHandlers(event)
    ?.find((prevHandler) => prevHandler.template === handler.template);

  if (!shouldUpdate) {
    prevHandler ?? vStorage.setHandler(event, handler);
    return;
  }

  vStorage.setHandler(event, handler);
};

export default useHandler;
