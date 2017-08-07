/*!
    \class Signal
    \brief Implementation of signal/slot pattern.
    \see https://github.com/millermedeiros/js-signals/wiki/Comparison-between-different-Observer-Pattern-implementations
    \see http://robdodson.me/javascript-design-patterns-observer/
*/

type Slot = (...args: any[]) => any;

export class Signal extends Function {
    slots: undefined | Slot | Slot[];

    constructor() {
        super();
        //! \see https://stackoverflow.com/questions/340383/can-a-javascript-object-have-a-prototype-chain-but-also-be-a-function
        //! \see https://stackoverflow.com/questions/36871299/how-to-extend-function-with-es6-classes
        function signal() {
            return (<any>signal).emit.apply(signal, arguments);
        }
        return (<any>Object).setPrototypeOf(signal, Signal.prototype);
    }

    emit() {
        if (!this.slots)
            return false;
        if (typeof this.slots === 'function')
            this.slots.apply(this, arguments);
        else {
            const list = this.slots.slice(); // avoid 'once' side-effects
            for (let i = 0; i < list.length; i++)
                list[i].apply(this, arguments);
        }
        return true;
    }

    connect(slot: Slot) {
        if (typeof slot !== 'function')
            throw new TypeError('slot must be a function');
        if (!this.slots)
            this.slots = slot;
        else if (typeof this.slots === 'function')
            this.slots = [this.slots, slot];
        else
            this.slots.push(slot);
    }

    disconnect(slot: Slot) {
        if (typeof slot !== 'function')
            throw new TypeError('slot must be a function');
        if (!this.slots)
            return;
        if (typeof this.slots === 'function') {
            if (slot === this.slots)
                delete this.slots;
        }
        else {
            for (let i = this.slots.length; i-- > 0;)
                if (slot === this.slots[i])
                    this.slots.splice(i, 1);
            if (this.slots.length === 1)
                this.slots = this.slots[0];
            else if (this.slots.length === 0)
                delete this.slots;
        }
    }

    once(slot: Slot) {
        if (typeof slot !== 'function')
            throw new TypeError('slot must be a function');
        let fired = false;
        function g() {
            if (!fired) {
                fired = true;
                this.disconnect(g);
                slot.apply(this, arguments);
            }
        }
        this.connect(g);
    }

    disconnectAll() {
        delete this.slots;
    }

    slotCount() {
        if (!this.slots)
            return 0;
        if (typeof this.slots === 'function')
            return 1;
        return this.slots.length;
    }
}

export default function signal() {
    return new Signal();
}
