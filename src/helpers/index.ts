const responseModifier=(tempRes:any)=>{
      const response={
            "id": tempRes.id,
            "name": tempRes.name,
            "email": tempRes.email,
            "phone": tempRes.phone,
            "role": tempRes.role
    }

    return response

}
export default responseModifier