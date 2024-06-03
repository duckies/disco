import { describe, test, expect, spyOn } from "bun:test";
import { Emitter } from "./emitter";

interface TestEmitter {
  example: [arg1: string];
}

describe("Emitter", () => {
  test("should call listeners when events are emitted", async () => {
    const em = new Emitter<TestEmitter>();

    const testData = {
      listener: (arg1: string) => expect(arg1).toBeString(),
    };
    const listenerSpy = spyOn(testData, "listener");

    em.on("example", testData.listener);
    await em.emit("example", "test");

    expect(listenerSpy).toHaveBeenCalledTimes(1);
    expect(listenerSpy).toBeCalledWith("test");
  });

  test("should call once registered listeners only once", async () => {
    const em = new Emitter<TestEmitter>();

    const testData = {
      listener: (arg1: string) => expect(arg1).toBeString(),
    };

    const listenerSpy = spyOn(testData, "listener");

    em.once("example", testData.listener);
    await em.emit("example", "test");

    expect(listenerSpy).toHaveBeenCalledTimes(1);
    expect(listenerSpy).toBeCalledWith("test");

    const secondEmitResult = em.emit("example", "test");

    expect(secondEmitResult).toBeFalse();
    expect(listenerSpy).toHaveBeenCalledTimes(1);
  });

  test("should call listeners in order of registration", async () => {
    const em = new Emitter<TestEmitter>();
    let called = 0;

    const testData = {
      listener1: (arg1: string) => {
        expect(called).toBe(0);
        expect(arg1).toBe("test");
        called++;
      },
      listener2: (arg1: string) => {
        expect(called).toBe(1);
        expect(arg1).toBe("test");
        called++;
      },
    };

    const listener1Spy = spyOn(testData, "listener1");
    const listener2Spy = spyOn(testData, "listener2");

    em.on("example", testData.listener1);
    em.on("example", testData.listener2);
    await em.emit("example", "test");
    expect(listener1Spy).toBeCalledTimes(1);
    expect(listener2Spy).toBeCalledTimes(1);
    expect(called).toBe(2);
  });
});
