const
    list = [false, 1, '2', [3, 4], { ot: '5' }],
    bucket = {
        bool: [],
        string: [],
        number: [],
        list: [],
        object: [],
    };

list.forEach(elem => {

    console.log(typeof elem)
    switch (typeof elem) {
        case 'boolean':
            bucket.bool.push(elem);
            break;
        case 'string':
            bucket.string.push(elem);
            break;
        case 'number':
            bucket.number.push(elem);
            break;
        case 'object':
            if (Array.isArray(elem)) {
                bucket.list.push(elem);
            } else {
                bucket.object.push(elem);
            }
            break;
        default:
            console.log(`${elem} is undefined`);
    }
})

console.log(bucket)