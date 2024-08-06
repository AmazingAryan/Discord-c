
import {db} from "@/lib/db";

export const getOrCreateConversation = async (memberOneid: string, memberTwoId: string) => {

    let conversation = await findConvsersation(memberOneid, memberTwoId) || await findConvsersation(memberTwoId, memberOneid);

    if(!conversation)(
        conversation = await createNewConversation(memberOneid, memberTwoId)
    )

    return conversation;
}

const findConvsersation = async (memberOneId: string, memberTwoId: string) => {
   try {
    return await db.conversation.findFirst({
        where: {
            AND: [
                { memberOneId: memberOneId},
                { memberTwoId: memberTwoId},
            ]
        },
        include: {
            memberOne: {
                include: {
                    profile: true,
                }
            },
            memberTwo: {
                include: {
                    profile: true,
                }
            }
        }
    });
   } catch {
        return null;
   }
}

const createNewConversation = async (memberOneId: string, memberTwoId: string)=>{
    try {
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId,
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    }
                },
                memberTwo: {
                    include: {
                        profile: true,
                    }
                }
            }
        });
    } catch{
        return null;
    }
}

