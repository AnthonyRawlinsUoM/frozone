## What is a Subscriber
Marks a class as an event subscriber which can listen to specific entity events or any entity events. Events are firing using QueryBuilder and repository/manager methods. Example:

    @EventSubscriber()
    export class PostSubscriber implements EntitySubscriberInterface<Post> {


        /**
         * Indicates that this subscriber only listen to Post events.
         */
        listenTo() {
            return Post;
        }
        
        /**
         * Called before post insertion.
         */
        beforeInsert(event: InsertEvent<Post>) {
            console.log(`BEFORE POST INSERTED: `, event.entity);
        }

    }

You can implement any method from EntitySubscriberInterface. To listen to any entity you just omit listenTo method and use any:

    @EventSubscriber()
    export class PostSubscriber implements EntitySubscriberInterface {

        /**
         * Called before entity insertion.
         */
        beforeInsert(event: InsertEvent<any>) {
            console.log(`BEFORE ENTITY INSERTED: `, event.entity);
        }

    }
