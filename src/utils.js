export const chunk = (arr, qty) => {
    const result = [];
    let temp = [];

    arr.forEach((current, index) => {
        temp.push(current);
        const isLast = index === (arr.length -1)

        if(temp.length >= qty || isLast ){
            result.push(temp);
            temp = []

        }
    });
    return result;
}