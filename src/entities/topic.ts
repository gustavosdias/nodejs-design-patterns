export interface ITopic {
    id?: number;
    name: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
    parentTopicId?: number;
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

    constructor(props: ITopic) {
        if(props.name == '') throw new Error('Topic name cannot be empty');
        if(props.content == '') throw new Error('Topic content cannot be empty');
        props.id = -1;
        props.version = -1;
        this.props = props;
    }

    public setNewUpdatedAt = (newValue: Date) => {
        if(newValue.getDate() <= this.updatedAt.getDate()) {
            throw new Error("New date cannot be equal or before current updatedAt date");
        }
    };
}

class ParentTopic extends Topic {
    //get parent
    //get children
}

class ChildTopic extends Topic {
    //get parent
    //get children
}

export const createTopic = (data: ITopic) => {
    if(data.parentTopicId) {
        return new ChildTopic(data);
    }else {
        return new ParentTopic(data);
    }
};