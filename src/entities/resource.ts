type ResourceType = 'video' | 'article' | 'pdf';

export interface IResource{
    id?: number,
    topicId: number,
    url: string,
    description?: string,
    type: ResourceType,
    createdAt?: Date,
    updatedAt?: Date,
}

export class Resource {
    private props: IResource;

    get id() {
        return this.props.id;
    }

    get topicId() {
        return this.props.topicId;
    }

    get url() {
        return this.props.url;
    }

    get description() {
        return this.props.description;
    }

    get type() {
        return this.props.type;
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

    public setNewUpdatedAt = (newValue: Date) => {
        if(newValue.getDate() <= this.updatedAt.getDate()) {
            throw new Error("New date cannot be equal or before current updatedAt date");
        }
    };

    constructor(props: IResource) {
        if(props.topicId === undefined) throw new Error('Resource topicId cannot be empty');
        if(props.url == '') throw new Error('Resource url cannot be empty');
        if(!props.type) throw new Error('Resource type cannot be empty');
        props.id = -1;
        this.props = props;
    }

}