from auth.gatekeeper_bypass import bypass_for_agent

def watson_auth_gate(agent_id):
    if not bypass_for_agent(agent_id):
        raise PermissionError(f"🛡️ Access denied for agent: {agent_id}")
    else:
        print(f"✅ Agent {agent_id} granted full execution clearance.")
