class InviteMailer < ApplicationMailer
  def invite_user
    email, @token = params.require([:email, :token])

    mail(to: email, subject: 'Invitation to be a GSP attendance recorder')
  end
end
