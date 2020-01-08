import {ListView} from '../../modules/list';


export function StartPage() {
    console.log(ListView);

    const test = async function () {
        const a = await 123;

        console.log(a);
    };

    test();
}