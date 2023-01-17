// autobind decorator
export function autobind(_, _2, descriptor) {
    const originaMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originaMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
//# sourceMappingURL=autobind.js.map