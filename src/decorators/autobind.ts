namespace App {
// autobind decorator
  export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originaMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originaMethod.bind(this);
        return boundFn;
      }
    };
    return adjDescriptor;
  }
}