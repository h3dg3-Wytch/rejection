export default set => e => {
    const { target } = e;
    const { value } = target;
    set(value)
};

export const checkBoxSetter = set => f => e => {
    const { target } = e;
    const { checked } = target; 
    set(f(checked));
} 