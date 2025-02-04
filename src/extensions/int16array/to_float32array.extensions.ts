export {};
declare global {
  interface Int16Array {
    toFloat32Array: () => Float32Array;
  }
}
Int16Array.prototype.toFloat32Array = function () {
  const float32 = new Float32Array(this.length);
  for (let i = 0; i < this.length; i++) float32[i] = this[i] / 32768;
  return float32;
};
