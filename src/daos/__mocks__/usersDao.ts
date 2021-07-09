export const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));

const getOneFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));
const addFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));


export default class UserDao {
    private TableName = 'SYLPH_TABLE'

    public getOne = getOneFn
    public add = addFn

}