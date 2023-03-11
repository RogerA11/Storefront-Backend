import { Order, OrderStore } from "../../models/order";
const store = new OrderStore()

describe('Order Model', () => {
    describe('Show method', () => {
        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
    });
});
