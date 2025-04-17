export interface ITopic {
    id?: number;
    name: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
    parentTopicId?: number;
    children?: ITopic[];
    addChild?: (topic: ITopic)=> void;
    setNewUpdatedAt?: (newValue: Date)=> void;
    removeChild?: (topic: ITopic)=> void;
    setParent?: (topic: ITopic | null)=> void;
    getParent?: ()=> ITopic;
    getShortestPathBewtweeenTwoTopics?: (start: ITopic, end: ITopic)=> number | null;
}

abstract class Topic implements ITopic{
    private props: ITopic;

    get id() {
        return this.props.id;
    }

    set id(newValue) {
        this.props.id = newValue;
    }

    get name() {
        return this.props.name;
    }

    set name(newValue: string) {
        this.props.name = newValue;
    }

    get content() {
        return this.props.content;
    }

    set content(newValue: string) {
        this.props.content = newValue;
    }

    get createdAt() {
        if(!this.props.createdAt) {
            return new Date();
        }
        return this.props.createdAt;
    }

    get updatedAt() {
        if(!this.props.updatedAt) {
            return new Date();
        }
        return this.props.updatedAt;
    }

    get version() {
        return this.props.version;
    }

    set version(newValue) {
        this.props.version = newValue;
    }

    get parentTopicId() {
        return this.props.parentTopicId;
    }

    get children () {
        return this.props.children;
    }

    constructor(props: ITopic) {
        if(props.name == '') throw new Error('Topic name cannot be empty');
        if(props.content == '') throw new Error('Topic content cannot be empty');
        props.id = -1;
        props.version = -1;
        props.children = [];
        this.props = props;
    }

    public setNewUpdatedAt = (newValue: Date) => {
        if(newValue.getDate() <= this.updatedAt.getDate()) {
            throw new Error("New date cannot be equal or before current updatedAt date");
        }
    };

    public addChild = ((topic: ITopic) => {
        this.children!.push(topic);
    });

    public removeChild = ((topic: ITopic) => {
        const componentIndex = this.children!.indexOf(topic);
        this.children!.splice(componentIndex, 1);

        topic.setParent!(null);
    });
}

class ParentTopic extends Topic {
    public getShortestPathBewtweeenTwoTopics = (start: ITopic, end: ITopic) => {
        // Queue holds pairs: [current topic, path from start to current]
        const queue: [ITopic, ITopic[]][] = [[start, [start]]];
        const visited = new Set<ITopic>();
        let pathCost = 0;
        while (queue.length > 0) {
          const [current, path] = queue.shift()!; // Dequeue the next topic and path
          if (current === end) return pathCost;
      
          if (visited.has(current)) continue;
          visited.add(current);
      
          // Determine which topics we can move to: children and parent
          const neighbors: ITopic[] = [...current.children!];
          if (current.parentTopicId !== undefined) {
            neighbors.push(current.getParent!());
          }
      
          for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
              queue.push([neighbor, [...path, neighbor]]);
            }
          }
          pathCost++;
        }
      
        return null; // No path found
    };
}

class ChildTopic extends Topic {
    private parent: ParentTopic | null;


    public setParent(parent: ParentTopic | null) {
        this.parent = parent;
    }

    public getParent(): ParentTopic | null {
        return this.parent;
    }
}

export const createTopic = (data: ITopic): ITopic => {
    if(data.parentTopicId !== undefined) {
        return new ChildTopic(data) as ITopic;
    }else {
        return new ParentTopic(data) as ITopic;
    }
};